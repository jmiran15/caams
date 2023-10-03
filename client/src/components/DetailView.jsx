import { Card, Modal } from "@mantine/core";
import Body from "./Body";
import ActionBar from "./ActionBar";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ApplicationModal from "./ApplicationModal";
import { useDisclosure } from "@mantine/hooks";
import { PocketbaseContext } from "../context/PocketbaseContext";

const DetailView = () => {
  const pb = useContext(PocketbaseContext);
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();
  const [opened, Modalhandlers] = useDisclosure(false);
  const [fullscreen, { open: openFullscreen, close: closeFullscreen }] =
    useDisclosure(false);

  useEffect(() => {
    pb.collection("jobs")
      .getOne(id)
      .then((job) => setJob(job));
  }, [id]);

  const handleClose = () => {
    navigate("/student/jobs");
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={Modalhandlers.close}
        title="Application"
        size="xl"
        // transitionProps={{ transition: "fade", duration: 200 }}
      >
        {job && <ApplicationModal job={job} handlers={Modalhandlers} />}
      </Modal>
      {/* full screen modal */}
      <Modal
        opened={fullscreen}
        onClose={closeFullscreen}
        size="xl"
        withCloseButton={false}
        // transitionProps={{ transition: "fade", duration: 200 }}
      >
        {job && (
          <ActionBar
            key={job.id}
            selectedJob={job}
            close={handleClose}
            fullscreen={fullscreen}
            closeFullscreen={closeFullscreen}
            handlers={Modalhandlers}
          />
        )}
        {job && job.description ? (
          <Body jobDescription={job.description} height={"50vh"} />
        ) : (
          <></>
        )}
      </Modal>
      <Card radius="md" withBorder padding="lg">
        <Card.Section withBorder inheritPadding p="lg">
          {job && (
            <ActionBar
              key={job.id}
              selectedJob={job}
              close={handleClose}
              handlers={Modalhandlers}
              openFullscreen={openFullscreen}
            />
          )}
        </Card.Section>
        {job && job.description ? (
          <Card.Section inheritPadding p="lg">
            <Body jobDescription={job.description} height={"50vh"} />
          </Card.Section>
        ) : (
          <></>
        )}
      </Card>
    </>
  );
};

export default DetailView;
