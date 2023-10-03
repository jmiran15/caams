import { useContext, useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import dayjs from "dayjs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  Card,
  Group,
  ScrollArea,
  Stack,
  Text,
  px,
  useMantineTheme,
} from "@mantine/core";
import { useElementSize, useViewportSize } from "@mantine/hooks";
import { PocketbaseContext } from "../../../../context/PocketbaseContext";

export default function Dashboard() {
  const pb = useContext(PocketbaseContext);
  const { id } = useParams();
  let user = pb.authStore.model;
  const [job, setJob] = useState(undefined);
  const [newApplicationsByDay, setNewApplicationsByDay] = useState([]);
  const [totalApplications, setTotalApplications] = useState(undefined);
  const [applications, setApplications] = useState([]);
  const [feedbackAlerts, setFeedbackAlerts] = useState([]);
  const [scorecardAlerts, setScorecardAlerts] = useState([]);
  const [stageMoves, setStageMoves] = useState([]);

  useEffect(() => {
    Promise.all([
      pb.collection("jobs").getOne(id),
      pb.collection("newApplicationsByDay").getFullList({
        filter: `job = "${id}"`,
      }),
      pb.collection("totalApplications").getFullList({
        filter: `job = "${id}"`,
      }),
      pb.collection("applicationsView").getFullList({
        filter: `job = "${id}"`,
        expand: "user",
      }),
      pb.collection("feedbackAlerts").getFullList({
        filter: `job = "${id}"`,
      }),
      pb.collection("scorecardAlerts").getFullList({
        filter: `job = "${id}"`,
      }),
      pb.collection("stageMoveAlerts").getFullList({
        filter: `job = "${id}"`,
      }),
    ])
      .then(
        ([
          job,
          newApplicationsByDay,
          totalApplications,
          applications,
          feedbackAlerts,
          scorecardAlerts,
          stageMoves,
        ]) => {
          setJob(job);
          setNewApplicationsByDay(newApplicationsByDay);
          setTotalApplications(totalApplications);
          setApplications(applications);
          setFeedbackAlerts(feedbackAlerts);
          setScorecardAlerts(scorecardAlerts);
          setStageMoves(stageMoves);
        }
      )
      .catch((error) => {
        console.log("error: ", error);
      });
  }, [id]);

  let alerts = [
    ...applications,
    ...feedbackAlerts,
    ...scorecardAlerts,
    ...stageMoves,
  ].filter((alert) => {
    if (
      alert.collectionName === "scorecardAlerts" ||
      alert.collectionName === "feedbackAlerts"
    ) {
      if (alert.createdBy === user.id) {
        return false;
      }
    }
    return true;
  });

  alerts.sort((a, b) => {
    const dateA = new Date(
      a.collectionName === "applicationsView" ? a.created : a.date
    );
    const dateB = new Date(
      b.collectionName === "applicationsView" ? b.created : b.date
    );

    // Swap a and b to make it sort descending (latest elements first)
    return dateB - dateA;
  });

  let lastWeekData = getLastWeekData(newApplicationsByDay);
  const { ref, width: cardWidth } = useElementSize();
  const [width, height] = useOutletContext();
  const theme = useMantineTheme();
  const { height: vh } = useViewportSize();

  let cH = vh - 60 - height - px(theme.spacing.xl) * 4;

  let graphHeight = cH - px(theme.spacing.xl) * 2;
  let graphWidth = cardWidth;

  return (
    <Stack align="center" mx={160} my="xl">
      <Card ref={ref} withBorder padding="md" radius="md" w="100%" h={cH}>
        <AreaChart
          width={graphWidth}
          height={graphHeight}
          data={lastWeekData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="applications"
            stroke="#1864AB"
            fill="#1864AB"
          />
        </AreaChart>
      </Card>
      <Card withBorder radius="md" padding="xl" w="100%">
        <ScrollArea.Autosize mah={cH} maw="100%" mx="auto">
          <Stack>
            {alerts.map((alert) => {
              let date = dayjs(
                alert.collectionName === "applicationsView"
                  ? alert.created
                  : alert.date
              ).format("MMMM D, YYYY");

              let text = () => {
                switch (alert.collectionName) {
                  case "feedbackAlerts":
                    return `${alert.employerFirstName} ${alert.employerLastName} left feedback on ${alert.applicantFirstName} ${alert.applicantLastName}`;
                  case "scorecardAlerts":
                    return `${alert.createdByFirstName} ${alert.createdByLastName} left a scorecard on ${alert.applicantFirstName} ${alert.applicantLastName}`;
                  case "stageMoveAlerts":
                    return `stage move alert`;
                  case "applicationsView":
                    return `${alert.expand.user.firstName} ${alert.expand.user.lastName} applied`;
                  default:
                    return "";
                }
              };

              return (
                <Group key={alert} position="apart">
                  <Text>
                    {!alert.seenBy.includes(user.id) && "(new) "}
                    {text()}
                  </Text>
                  <Text>{date}</Text>
                </Group>
              );
            })}
          </Stack>
        </ScrollArea.Autosize>
      </Card>
    </Stack>
  );
}

// have option for 1 week, all time

function getLastWeekData(applications) {
  let data = [];

  for (let i = 6; i >= 0; i--) {
    let date = dayjs().subtract(i, "day");
    let dateString = date.format("YYYY-MM-DD");

    let dayData = applications.find(
      (app) => dayjs(app.date).format("YYYY-MM-DD") === dateString
    );

    data.push({
      name: dateString,
      applications: dayData ? dayData.totalNewApplications : 0,
    });
  }

  return data;
}
