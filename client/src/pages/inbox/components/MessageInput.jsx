import { useContext } from "react";
import { Textarea, Grid, ActionIcon, useMantineTheme } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { PocketbaseContext } from "../../../context/PocketbaseContext";

function MessageInput({
  postMessage,
  selectedUser,
  text,
  setText,
  componentRef,
}) {
  const pb = useContext(PocketbaseContext);
  const theme = useMantineTheme();

  return (
    <Grid align="flex-start" gutter={0} ref={componentRef}>
      <Grid.Col
        span="auto"
        style={{
          paddingRight: theme.spacing.sm,
        }}
      >
        <Textarea
          autosize
          maxRows={4}
          minRows={1}
          size="md"
          placeholder="Enter your message here"
          value={text}
          onChange={(event) => {
            setText(event.currentTarget.value);
          }}
        />
      </Grid.Col>

      <Grid.Col span="content">
        <ActionIcon
          variant="filled"
          color="blue.9"
          size="lg"
          onClick={() => {
            if (!text) {
              return;
            }
            postMessage(pb.authStore.model.id, selectedUser.id, text);
            setText("");
          }}
        >
          <IconSend size="1.125rem" />
        </ActionIcon>
      </Grid.Col>
    </Grid>
  );
}

export default MessageInput;
