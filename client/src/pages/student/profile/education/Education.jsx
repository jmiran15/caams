import React, { useContext } from "react";
import { Stack, Text, Modal, Button, Card, Center } from "@mantine/core";
import EducationCard from "../../../../components/EducationCard";
import { useDisclosure } from "@mantine/hooks";
import NewEducation from "../../../../components/NewEducation";
import { useEffect, useState, useReducer } from "react";
import {
  experiencesReducer,
  SET_EXPERIENCES,
} from "../../../../reducers/experiencesReducer";
import { PocketbaseContext } from "../../../../context/PocketbaseContext";

const Education = () => {
  const pb = useContext(PocketbaseContext);
  let user = pb.authStore.model;
  const [educations, dispatch] = useReducer(experiencesReducer, []);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  // synch the educations with user (should probably just synch whole thing and make the code shorter)
  useEffect(() => {
    pb.collection("user")
      .update(user.id, {
        educations: educations.map((education) => education.id),
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [educations]);

  // MAYBE WE SHOULD JUST "SYNCH" STATE AND DB WITH A USEEFFECT???

  useEffect(() => {
    pb.collection("education")
      .getFullList({
        sort: "-created",
        filter: `user = "${user.id}"`,
      })
      .then((res) => {
        dispatch({ type: SET_EXPERIENCES, payload: res });
      });
  }, []);

  function handleSelect(education) {
    setSelectedEducation(education);
    open();
  }

  function handleNewEducation() {
    setSelectedEducation(null);
    open();
  }

  return (
    <Stack w="100%">
      <Modal
        opened={opened}
        onClose={close}
        title="Add an education"
        size="xl"
        // transitionProps={{ transition: "fade", duration: 200 }}
      >
        <NewEducation
          dispatch={dispatch}
          close={close}
          education={selectedEducation}
        />
      </Modal>
      <Button
        onClick={handleNewEducation}
        style={{
          alignSelf: "flex-end",
        }}
        radius="md"
        size="md"
        color="blue.9"
      >
        Add another education
      </Button>

      <Stack spacing="md">
        {educations.length ? (
          educations.map((education) => {
            return (
              <EducationCard
                key={education.id}
                education={education}
                dispatch={dispatch}
                handleSelect={() => handleSelect(education)}
              />
            );
          })
        ) : (
          <Card radius="md" withBorder padding="xl">
            <Center>
              <Text>No educations yet.</Text>
            </Center>
          </Card>
        )}
      </Stack>
    </Stack>
  );
};

export default Education;
