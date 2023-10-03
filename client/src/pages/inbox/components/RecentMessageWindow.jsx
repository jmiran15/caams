import {
  Text,
  Button,
  Stack,
  Grid,
  Modal,
  Tooltip,
  ScrollArea,
  useMantineTheme,
  px,
} from "@mantine/core";
import RecentMessages from "./RecentMessages";
import SearchUsers from "./SearchUsers";
import { Send } from "tabler-icons-react";
import { useDisclosure, useElementSize } from "@mantine/hooks";
import useSmallerThanSm from "../../../hooks/useSmallerThanSm";

function RecentMessageWindow({
  selectedUser,
  recentUsers,
  updateSelectedUser,
  cardHeight,
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const { ref, height } = useElementSize();

  let maxScrollAreaHeight =
    cardHeight - px(theme.spacing.md) * 2 - px(theme.spacing.sm) - height;

  const smallerThanSm = useSmallerThanSm();

  return (
    <Stack spacing="sm">
      <Grid align="center" ref={ref}>
        <Grid.Col span="auto">
          <Text size="lg" fw={600}>
            Messages
          </Text>
        </Grid.Col>
        <Grid.Col span="content">
          <Modal
            opened={opened}
            onClose={close}
            title="Search for a user to message"
            size="xl"
            // transitionProps={{ transition: "fade", duration: 200 }}
          >
            <SearchUsers
              updateSelectedUser={updateSelectedUser}
              close={close}
            />
          </Modal>
          <Tooltip label="Send a new message">
            <Button
              size="md"
              color="blue.9"
              radius="md"
              onClick={open}
              leftIcon={<Send size="1.125rem" />}
            >
              Search Users
            </Button>
          </Tooltip>
        </Grid.Col>
      </Grid>
      <ScrollArea.Autosize
        mah={smallerThanSm ? maxScrollAreaHeight / 2 : maxScrollAreaHeight}
      >
        <RecentMessages
          selectedUser={selectedUser}
          recentUsers={recentUsers}
          updateSelectedUser={updateSelectedUser}
        />
      </ScrollArea.Autosize>
    </Stack>
  );
}

export default RecentMessageWindow;
