import { Stack, Modal, Card, Center, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, useEffect, useContext } from "react";
import Application from "../../../components/Application";
import ApplicationListItem from "../../../components/ApplicationListItem";
import { PocketbaseContext } from "../../../context/PocketbaseContext";
import useSmallerThanSm from "../../../hooks/useSmallerThanSm";

export default function Applications() {
  const pb = useContext(PocketbaseContext);
  const [applicationOpen, applicationOpenHandler] = useDisclosure();
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  let userId = pb.authStore.model.id;

  useEffect(() => {
    pb.collection("application")
      .getFullList({
        sort: "-created",
        filter: `user = "${userId}"`,
        expand: "stage,stage.job",
      })
      .then((applications) => setApplications(applications));
  }, []);

  function handleOpenApplication(applicationId) {
    setSelectedApplication(applicationId);
    applicationOpenHandler.open();
  }

  function handleCloseApplication() {
    applicationOpenHandler.close();
    setSelectedApplication(null);
  }

  const smallerThanSm = useSmallerThanSm();

  return (
    <Stack px={smallerThanSm ? "xl" : 160} my="xl">
      <Modal
        opened={applicationOpen}
        onClose={handleCloseApplication}
        title="Application"
        size="xl"
        fullScreen={smallerThanSm}
        // transitionProps={{ transition: "fade", duration: 200 }}
      >
        {selectedApplication && (
          <Application applicationId={selectedApplication} />
        )}
      </Modal>
      {applications.length > 0 ? (
        applications.map((application) => (
          <ApplicationListItem
            key={application.id}
            application={application}
            handleOpenApplication={() => handleOpenApplication(application.id)}
          />
        ))
      ) : (
        <Card withBorder padding="md" radius="md">
          <Center>
            <Text>
              You have no applications. You will see them here once you apply
              for a job.
            </Text>
          </Center>
        </Card>
      )}
    </Stack>
  );
}
