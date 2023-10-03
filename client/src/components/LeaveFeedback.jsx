import { Group, Stack, Textarea, Button } from "@mantine/core";
import { useContext, useState } from "react";
import { PocketbaseContext } from "../context/PocketbaseContext";

export default function Feedback({ applicationId, close }) {
  const pb = useContext(PocketbaseContext);
  const [feedback, setFeedback] = useState("");
  const user = pb.authStore.model; // to get the id of the user leaving the feedback

  async function saveFeedback() {
    try {
      await pb.collection("feedback").create({
        application: applicationId,
        employer: user.id,
        feedback: feedback,
      });
      close();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Stack>
      <Textarea
        label="Feedback"
        placeholder="Enter feedback here..."
        required
        value={feedback}
        onChange={(event) => setFeedback(event.currentTarget.value)}
        minRows={3}
        maxRows={5}
      />
      <Group position="apart">
        <Button onClick={saveFeedback}>Save</Button>
      </Group>
    </Stack>
  );
}
