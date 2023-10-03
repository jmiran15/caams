import {
  Stack,
  Text,
  Title,
  Tabs,
  Button,
  Flex,
  Group,
  Badge,
} from "@mantine/core";
import { Outlet, useNavigate, useParams, useLocation } from "react-router";
import { useContext, useEffect, useState } from "react";
import { patchJob } from "../../../helpers/collections/jobs/api";
import { PocketbaseContext } from "../../../context/PocketbaseContext";
import { useElementSize } from "@mantine/hooks";

function Job() {
  const pb = useContext(PocketbaseContext);
  const { id } = useParams();
  const user = pb.authStore.model;
  const navigate = useNavigate();
  const location = useLocation();
  let activeTab = location.pathname.split("/").pop();
  const [job, setJob] = useState({});

  useEffect(() => {
    pb.collection("jobs")
      .getOne(id)
      .then((job) => setJob(job));
  }, []);

  function requestApproval() {
    patchJob(pb, id, { status: user.isAdmin ? "active" : "pending" }).then(
      (job) => setJob(job)
    );
  }

  const { ref, width, height } = useElementSize();

  return (
    <Flex direction="column" w="100%">
      <Stack bg="blue.1" px={160} pt="30px" w="100%" ref={ref}>
        <Title order={1} align="left">
          {job.title}
        </Title>

        <Group position="apart">
          <Tabs
            variant="outline"
            value={activeTab}
            onTabChange={(value) => navigate(`${value}`)}
          >
            <Tabs.List>
              <Tabs.Tab
                bg={activeTab === "dashboard" ? "white" : ""}
                value="dashboard"
              >
                Job Dashboard
              </Tabs.Tab>
              <Tabs.Tab
                bg={activeTab === "candidates" ? "white" : ""}
                value="candidates"
                disabled={job.status === "draft"}
              >
                Candidates
              </Tabs.Tab>
              <Tabs.Tab
                bg={activeTab === "settings" ? "white" : ""}
                value="settings"
              >
                Job Setup
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <Group spacing="xs">
            <Text>Job Status: </Text>
            <Badge
              variant="filled"
              size="md"
              color={
                job.status === "deleted"
                  ? "red"
                  : job.status === "draft"
                  ? "yellow"
                  : job.status === "closed"
                  ? "gray"
                  : "green"
              }
            >
              {job.status}
            </Badge>

            {(job.status === "draft" ||
              (job.status === "pending" && user.isAdmin)) && (
              <Button
                radius="xs"
                compact
                color="blue.9"
                onClick={() => requestApproval()}
              >
                {user.isAdmin ? "Publish job" : "Request approval"}
              </Button>
            )}
          </Group>
        </Group>
      </Stack>
      <Outlet context={[width, height]} />
    </Flex>
  );
}

export default Job;
