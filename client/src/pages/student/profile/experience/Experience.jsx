import React, { useContext } from "react";
import { Stack, Text, Modal, Button, Card, Center } from "@mantine/core";
import ExperienceCard from "../../../../components/ExperienceCard";
import { useDisclosure } from "@mantine/hooks";
import NewExperience from "../../../../components/NewExperience";
import { useEffect, useState, useReducer } from "react";
import {
  experiencesReducer,
  SET_EXPERIENCES,
} from "../../../../reducers/experiencesReducer";
import { PocketbaseContext } from "../../../../context/PocketbaseContext";

const Experience = () => {
  const pb = useContext(PocketbaseContext);
  let user = pb.authStore.model;
  const [experiences, dispatch] = useReducer(experiencesReducer, []);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  // synch the experiences with user
  useEffect(() => {
    pb.collection("user")
      .update(user.id, {
        experiences: experiences.map((experience) => experience.id),
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [experiences]);

  useEffect(() => {
    pb.collection("experience")
      .getFullList({
        sort: "-created",
        filter: `user = "${user.id}"`,
      })
      .then((res) => {
        dispatch({ type: SET_EXPERIENCES, payload: res });
      });
  }, []);

  function handleSelect(experience) {
    setSelectedExperience(experience);
    open();
  }

  function handleNewExperience() {
    setSelectedExperience(null);
    open();
  }

  return (
    <Stack w="100%">
      <Modal
        opened={opened}
        onClose={close}
        title="Add an experience"
        size="xl"
        // transitionProps={{ transition: "fade", duration: 200 }}
      >
        <NewExperience
          dispatch={dispatch}
          close={close}
          experience={selectedExperience}
        />
      </Modal>

      <Button
        onClick={handleNewExperience}
        style={{
          alignSelf: "flex-end",
        }}
        radius="md"
        size="md"
        color="blue.9"
      >
        Add an experience
      </Button>
      <Stack>
        {experiences.length ? (
          experiences.map((experience) => {
            return (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                dispatch={dispatch}
                handleSelect={() => handleSelect(experience)}
              />
            );
          })
        ) : (
          <Card radius="md" withBorder padding="xl">
            <Center>
              <Text>No experiences yet.</Text>
            </Center>
          </Card>
        )}
      </Stack>
    </Stack>
  );
};

export default Experience;
