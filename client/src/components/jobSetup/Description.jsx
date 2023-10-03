import { Stack, Text } from "@mantine/core";
import { useState } from "react";
import Editor from "../Editor";

export default function Description({ description, setDescription }) {
  const [characterCount, setCharacterCount] = useState(5000);

  return (
    <Stack spacing="xs">
      <Editor
        description={description}
        setDescription={setDescription}
        setCharacterCount={setCharacterCount}
      />
      <Text
        size="xs"
        color="dimmed"
        style={{
          alignSelf: "flex-end",
        }}
      >
        {characterCount} characters left
      </Text>
    </Stack>
  );
}
