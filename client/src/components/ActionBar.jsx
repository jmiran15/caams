import {
  CloseButton,
  Stack,
  Title,
  Button,
  Group,
  Text,
  ActionIcon,
} from "@mantine/core";
import {
  IconStarFilled,
  IconStar,
  IconArrowsMaximize,
} from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { PocketbaseContext } from "../context/PocketbaseContext";

const ActionBar = ({
  selectedJob,
  close,
  handlers,
  openFullscreen,
  fullscreen,
  closeFullscreen,
}) => {
  const pb = useContext(PocketbaseContext);
  const user = pb.authStore.model;
  const [firstStage, setFirstStage] = useState(null);
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(user.savedJobs.includes(selectedJob.id));

  useEffect(() => {
    if (saved) {
      pb.collection("user")
        .update(user.id, {
          savedJobs: [...user.savedJobs, selectedJob.id],
        })
        .then(() => console.log("saved job"))
        .catch((err) => console.log("error saving job: ", err));
    } else {
      pb.collection("user")
        .update(user.id, {
          savedJobs: user.savedJobs.filter((job) => job !== selectedJob.id),
        })
        .then(() => console.log("unsaved job"))
        .catch((err) => console.log("error unsaving job: ", err));
    }
  }, [saved]);

  // get first stage of job at id
  async function fetchFirstStage(jobId) {
    let record = await pb.collection("stage").getFullList({
      filter: `job = "${jobId}" && position = 1`,
    });
    setFirstStage(record[0]);
  }

  async function fetchApplication(stageId, useId) {
    let record = await pb.collection("application").getFullList({
      filter: `stage = "${stageId}" && user = "${useId}"`,
    });
    if (record.length > 0) {
      setApplied(true);
    }
  }

  function handleSaveJob() {
    setSaved(!saved);
  }

  useEffect(() => {
    fetchFirstStage(selectedJob.id);
  }, [selectedJob]);

  useEffect(() => {
    if (firstStage) {
      fetchApplication(firstStage.id, user.id);
    }
  }, [firstStage, user]);

  return (
    <Stack w="100%" align="flex-start" justify="flex-start">
      <Stack w="100%" spacing="0.4rem">
        <Group position="apart" w="100%">
          <Title order={3}>{selectedJob.title}</Title>
          <CloseButton
            aria-label="Close modal"
            onClick={fullscreen ? closeFullscreen : close}
            size="lg"
            iconSize={20}
          />
        </Group>
        <Text color="dimmed" size="md">
          Johns Hopkins University: Computer Science
        </Text>
        <Text color="dimmed" size="md">
          Baltimore, Maryland
        </Text>
      </Stack>

      <Group>
        <Button
          size="md"
          radius="md"
          color="blue.9"
          onClick={
            fullscreen
              ? () => {
                  closeFullscreen();
                  handlers.open();
                }
              : () => handlers.open()
          }
          disabled={!user.visible || applied}
        >
          {!user.visible
            ? "You profile is not public"
            : applied
            ? "Applied"
            : "Apply now"}
        </Button>
        <ActionIcon size="xl" variant="light" onClick={handleSaveJob}>
          {saved ? (
            <IconStarFilled size="1.625rem" />
          ) : (
            <IconStar size="1.625rem" />
          )}
        </ActionIcon>
        {!fullscreen && (
          <ActionIcon size="xl" variant="light">
            <IconArrowsMaximize size="1.625rem" onClick={openFullscreen} />
          </ActionIcon>
        )}
      </Group>
    </Stack>
  );
};

export default ActionBar;
