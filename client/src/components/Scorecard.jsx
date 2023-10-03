import { Stack, Textarea, Button, Group } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { PocketbaseContext } from "../context/PocketbaseContext";

export default function Scorecard({ close, applicationId, scorecardLabels }) {
  const pb = useContext(PocketbaseContext);
  const user = pb.authStore.model; // to get the id of the user leaving the scorecard
  const [scorecard, setScorecard] = useState([]);

  useEffect(() => {
    setScorecard(
      scorecardLabels.map((label, index) => {
        return {
          id: index,
          label: label.label,
          value: "",
        };
      })
    );
  }, [scorecardLabels]);

  async function saveScorecard() {
    try {
      await pb.collection("scorecards").create({
        application: applicationId,
        createdBy: user.id,
        scorecard: scorecard,
      });
      close();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Stack>
      {scorecard.map((sc) => (
        <Textarea
          key={sc.id}
          label={sc.label}
          required
          value={sc.value}
          onChange={(event) => {
            const newScorecard = scorecard.map((card) => {
              if (card.id === sc.id) {
                return { ...card, value: event.currentTarget.value };
              }
              return card;
            });
            setScorecard(newScorecard);
          }}
          minRows={2}
          maxRows={4}
        />
      ))}

      <Group position="apart">
        <Button onClick={saveScorecard}>Save</Button>
      </Group>
    </Stack>
  );
}
