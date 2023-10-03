import {
  Badge,
  Card,
  Checkbox,
  Stack,
  Group,
  Text,
  useMantineTheme,
  Grid,
  Flex,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PocketbaseContext } from "../context/PocketbaseContext";

const JobRow = ({ job, selectable, selectedJobs, setSelectedJobs }) => {
  const pb = useContext(PocketbaseContext);

  const navigate = useNavigate();
  const onClickJob = () =>
    selectable ? handleSelectJob() : handleNavigateToJob();
  const { hovered, ref } = useHover();
  const theme = useMantineTheme();
  const [totalApplications, setTotalApplications] = useState(0);

  useEffect(() => {
    pb.collection("totalApplications")
      .getOne(job.id)
      .then((record) => {
        if (record) {
          setTotalApplications(record.totalApplications);
        }
      })
      .catch((error) => setTotalApplications(0));
  }, [job.id]);

  let checked = selectedJobs.includes(job.id);

  function handleNavigateToJob() {
    navigate(`/instructor/jobs/${job.id}/dashboard`);
  }

  function handleSelectJob() {
    setSelectedJobs((prev) => {
      if (prev.includes(job.id)) {
        return prev.filter((id) => id !== job.id);
      } else {
        return [...prev, job.id];
      }
    });
  }

  return (
    <Card
      withBorder
      radius="md"
      ref={ref}
      w="100%"
      style={{
        cursor: selectable ? "default" : "pointer",
        backgroundColor: hovered ? theme.colors.gray[0] : undefined,
      }}
      onClick={onClickJob}
    >
      <Grid w="100%" align="center" gutter="md" m={0}>
        <Grid.Col span={"auto"}>
          <Stack h="100%">
            <Group>
              {selectable && <Checkbox checked={checked} readOnly />}
              <Text size="lg">{job.title}</Text>
            </Group>
          </Stack>
        </Grid.Col>
        {job.status === "active" && (
          <Grid.Col span={"content"}>
            <Group
              style={{
                alignSelf: "center",
              }}
              spacing="xl"
            >
              <Stack align="center" spacing="xs">
                <Text size="xl">{totalApplications}</Text>
                <Text size="xs" color="dimmed">
                  Total
                </Text>
              </Stack>
            </Group>
          </Grid.Col>
        )}

        <Grid.Col
          span={3}
          m={0}
          p={0}
          style={{
            alignSelf: "flex-start",
          }}
        >
          <Flex align={"flex-end"} justify={"flex-end"} h="100%" w="100%">
            <Badge>{job.status}</Badge>
          </Flex>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default JobRow;
