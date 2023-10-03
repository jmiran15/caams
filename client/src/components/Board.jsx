import { Box, Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import PocketBase from "pocketbase";
const pb = new PocketBase("http://10.203.70.207:8090");
// const pb = new PocketBase("https://caamsjhu.pockethost.io");

export default function Board({ jobId }) {
  const [stages, setStages] = useState([]);
  const [applications, setApplications] = useState([]);

  async function fetchApplications(stages) {
    Promise.all(
      stages.map((stage) =>
        pb.collection("application").getFullList({
          filter: `stage = "${stage.id}"`,
          expand: "user,stage",
          $cancelKey: stage.id,
        })
      )
    ).then((applications) => {
      setApplications(applications.flat());
    });
  }

  useEffect(() => {
    pb.collection("stage")
      .getFullList({
        sort: "+position",
        filter: `job = "${jobId}"`,
      })
      .then((stages) => {
        fetchApplications(stages);
        setStages(stages);
      });
  }, []);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (source.droppableId == destination.droppableId) return;

    pb.collection("application")
      .update(draggableId, {
        stage: destination.droppableId,
      })
      .then((res) =>
        setApplications(
          applications.map((application) => {
            if (application.id == draggableId) {
              application.stage = destination.droppableId;
            }
            return application;
          })
        )
      );
  };

  return (
    <>
      <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
        <Box>
          <Flex direction="row" gap="lg">
            {stages.map((stage) => (
              <Column
                key={stage.id}
                label={stage.label}
                list={applications.filter((a) => a.stage === stage.id)}
                id={stage.id}
              />
            ))}
          </Flex>
        </Box>
      </DragDropContext>
    </>
  );
}
