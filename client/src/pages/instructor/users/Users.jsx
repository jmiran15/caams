import { Stack, Modal } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import UserRow from "../../../components/UserRow";
import { useDisclosure } from "@mantine/hooks";
import Link from "../../../components/Link";
import Manual from "../../../components/Manual";
import { PocketbaseContext } from "../../../context/PocketbaseContext";

export default function Users() {
  const pb = useContext(PocketbaseContext);
  const [openedManual, manualHandlers] = useDisclosure(false);
  const [openedLink, linkHandlers] = useDisclosure(false);
  const [users, setUsers] = useState([]);
  const admin = pb.authStore.model;

  async function getUsers() {
    const users = await pb.collection("user").getFullList({
      filter: `admin = "${admin.id}" && role = "employer"`,
    });
    setUsers(users);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Stack px={160} py="xl">
      <Modal
        opened={openedManual}
        onClose={manualHandlers.close}
        title="Create a user manually"
      >
        <Manual close={manualHandlers.close} admin={admin.id} />
      </Modal>
      <Modal
        opened={openedLink}
        onClose={linkHandlers.close}
        title="Share a link with users"
      >
        <Link />
      </Modal>
      {/* <Group position="right">
        <Button onClick={manualHandlers.open} radius="xl" size="md">
          Add a user manually
        </Button>
        <Button onClick={linkHandlers.open} radius="xl" size="md">
          Share a link
        </Button>
      </Group> */}
      {users.map((user) => (
        <UserRow key={user.id} user={user} setUsers={setUsers} />
      ))}
    </Stack>
  );
}
