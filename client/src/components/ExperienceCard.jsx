import { Stack, Text, Card, Title, CloseButton, Flex } from "@mantine/core";
import { REMOVE_EXPERIENCE } from "../reducers/experiencesReducer";
import dayjs from "dayjs";
import { useContext } from "react";
import { PocketbaseContext } from "../context/PocketbaseContext";

const ExperienceCard = ({ experience, dispatch, handleSelect }) => {
  const pb = useContext(PocketbaseContext);

  function handleRemove(event) {
    event.stopPropagation();
    pb.collection("experience")
      .delete(experience.id)
      .then(() => dispatch({ type: REMOVE_EXPERIENCE, payload: experience }));
  }

  return (
    <Card
      padding="md"
      radius="md"
      withBorder
      onClick={handleSelect}
      style={{ cursor: "pointer" }}
    >
      <Stack spacing="xs">
        <Flex direction="row" justify="space-between" align="center" w="100%">
          <Title order={4}>
            {experience.employer} - {experience.title}
          </Title>
          <CloseButton onClick={handleRemove} />
        </Flex>
        <Text>{experience.location}</Text>
        <Text>
          {dayjs(experience.from).format("MMM D, YYYY")} -{" "}
          {experience.current
            ? "current"
            : dayjs(experience.to).format("MMM D, YYYY")}
        </Text>
        <Text color="dimmed">{experience.summary}</Text>
      </Stack>
    </Card>
  );
};

export default ExperienceCard;
