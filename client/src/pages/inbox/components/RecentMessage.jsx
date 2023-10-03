import { useContext, useEffect } from "react";
import {
  Group,
  Avatar,
  Indicator,
  Stack,
  px,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { InboxNotificationCountContext } from "../../../context/InboxNotificationCountContext";
import { PocketbaseContext } from "../../../context/PocketbaseContext";

function RecentMessage({ firstname, lastname, msg, onClick, read, selected }) {
  const pb = useContext(PocketbaseContext);

  useEffect(() => {
    getUnreadMessages();
  }, [read]);

  const { setInboxNotifications } = useContext(InboxNotificationCountContext);

  const { ref: rowRef, width: rowWidth } = useElementSize();
  const { ref: avatarRef, width: avatarWidth } = useElementSize();
  const theme = useMantineTheme();

  let textWidth =
    rowWidth - 2 * px(theme.spacing.sm) - avatarWidth - px(theme.spacing.md);

  const getUnreadMessages = async () => {
    const data = await pb.collection("messages").getList(1, 50, {
      expand: "from,to",
      filter: `to = "${pb.authStore.model.id}" && read = false`,
      sort: "-created",
      $autoCancel: false,
    });

    setInboxNotifications(data.items.length);
  };

  return (
    <Group
      ref={rowRef}
      p="sm"
      spacing="md"
      sx={(theme) => ({
        cursor: "pointer",
        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[5]
              : theme.colors.gray[1],
        },
      })}
      onClick={onClick}
    >
      {/* <Avatar radius="xl" src={null} alt="no image here" ref={avatarRef} /> */}
      <Stack spacing="0.1rem" w={textWidth}>
        <Text
          truncate
          size="sm"
          fw={600}
          sx={{
            textAlign: "left", // Add the textAlign property here
          }}
        >
          {firstname} {lastname}
        </Text>
        <Text
          truncate
          size="sm"
          fw={200}
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            //textAlign: 'left', // Add the textAlign property here
          }}
        >
          {msg}
        </Text>
      </Stack>
      {read ? null : <Indicator color="blue" />}
    </Group>
  );
}

export default RecentMessage;
