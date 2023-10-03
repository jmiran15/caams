import { Card, Stack, Group, Avatar, Text } from "@mantine/core";
import { useContext } from "react";
import { PocketbaseContext } from "../context/PocketbaseContext";

export default function UserRow({ user }) {
  const pb = useContext(PocketbaseContext);
  let avatarFileName = user.avatar;
  let avatar = "";
  if (avatarFileName !== "") avatar = pb.files.getUrl(user, avatarFileName);

  return (
    <Card withBorder padding="md" radius="md">
      <Group position="apart">
        <Group>
          {/* <Avatar size="lg" radius="xl" src={avatar} /> */}
          <Stack spacing={0}>
            <Text>
              {user.firstName} {user.lastName}
            </Text>
            <Text size="sm" color="dimmed">
              {user.email}
            </Text>
          </Stack>
        </Group>
      </Group>
    </Card>
  );
}
