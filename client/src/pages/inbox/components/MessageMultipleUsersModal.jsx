import { useState, useEffect, useContext } from "react";
import {
  Text,
  Grid,
  Stack,
  Textarea,
  ActionIcon,
  useMantineTheme,
  Group,
  Badge,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconSend } from "@tabler/icons-react";
import { PocketbaseContext } from "../../../context/PocketbaseContext";

function MessageMultipleUsersModal({ selectedUsers, close }) {
  const pb = useContext(PocketbaseContext);

  const [message, setMessage] = useState("");

  function handleSend() {
    Promise.all(
      selectedUsers.map((userID) => {
        return postMessage(pb.authStore.model.id, userID, message);
      })
    )
      .then((values) => {
        showNotification({
          title: "Message sent",
          message: "You successfully sent a message to multiple users",
        });
        close();
      })
      .catch((e) => {
        showNotification({
          title: "Message failed to send",
          message: "There was an error sending your message",
          color: "red",
        });
        close();
      });
  }

  const postMessage = async (from, to, text) => {
    // example create data
    const data = {
      from: `${from}`,
      to: `${to}`,
      message: `${text}`,
      read: false,
    };

    const record = await pb
      .collection("messages")
      .create(data, { $autoCancel: false });

    return record.id;
  };

  const theme = useMantineTheme();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // lets fetch the users
    Promise.all(
      selectedUsers.map((userID) => {
        return pb
          .collection("user")
          .getOne(userID)
          .then((user) => user)
          .catch((e) => console.log(e));
      })
    )
      .then((users) => setUsers(users))
      .catch((e) => console.log(e));
  }, [selectedUsers]);

  return (
    <Stack>
      {/* show the selected users */}
      <Group>
        <Text>Send message to:</Text>
        <Group spacing="xs">
          {users.length > 0 &&
            users.map((user) => (
              <Badge
                key={user.id}
                color="gray.3"
                variant="filled"
                radius="sm"
                size="lg"
                style={{ textTransform: "none", color: theme.colors.dark[9] }}
                p="sm"
              >
                {user.firstName} {user.lastName}
              </Badge>
            ))}
        </Group>
      </Group>
      <Grid align="flex-start" gutter={0}>
        <Grid.Col
          span="auto"
          style={{
            paddingRight: theme.spacing.sm,
          }}
        >
          <Textarea
            autosize
            maxRows={8}
            minRows={5}
            size="md"
            placeholder="Enter your message here"
            value={message}
            onChange={(event) => setMessage(event.currentTarget.value)}
          />
        </Grid.Col>

        <Grid.Col span="content">
          <ActionIcon
            variant="filled"
            color="blue.9"
            size="lg"
            onClick={handleSend}
          >
            <IconSend size="1.125rem" />
          </ActionIcon>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

export default MessageMultipleUsersModal;
