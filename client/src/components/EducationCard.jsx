import { Stack, Text, Card, Title, CloseButton, Flex } from "@mantine/core";
import { REMOVE_EXPERIENCE } from "../reducers/experiencesReducer";
import dayjs from "dayjs";
import { useContext } from "react";
import { PocketbaseContext } from "../context/PocketbaseContext";

export default function EducationCard({ education, dispatch, handleSelect }) {
  const pb = useContext(PocketbaseContext);

  function handleRemove(event) {
    event.stopPropagation();
    pb.collection("education")
      .delete(education.id)
      .then(() => dispatch({ type: REMOVE_EXPERIENCE, payload: education }));
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
            {education.school} - {education.field}
          </Title>
          <CloseButton onClick={handleRemove} />
        </Flex>
        <Text>
          {dayjs(education.from).format("MMM D, YYYY")} -{" "}
          {dayjs(education.to).format("MMM D, YYYY")}
        </Text>
      </Stack>
    </Card>
  );
}
