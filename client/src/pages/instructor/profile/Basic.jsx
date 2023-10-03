import { Stack, Group, Button, TextInput } from "@mantine/core";
import { useState } from "react";

export default function Basic({
  editingProfile,
  editingProfileHandlers,
  user,
  save,
  setUser,
}) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  // const [email, setEmail] = useState(user.email);

  return (
    <Stack spacing="sm" w="100%">
      <Group position="flex-start" grow>
        <TextInput
          disabled={!editingProfile}
          placeholder="First name"
          size="md"
          withAsterisk
          value={firstName}
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
        <TextInput
          disabled={!editingProfile}
          placeholder="Last name"
          size="md"
          withAsterisk
          value={lastName}
          onChange={(event) => setLastName(event.currentTarget.value)}
        />
      </Group>

      <Button
        color="blue.9"
        size="md"
        radius="md"
        style={{
          alignSelf: "flex-start",
        }}
        onClick={() => {
          if (editingProfile) {
            save(
              user,
              {
                firstName,
                lastName,
                // email,
              },
              setUser
            );
          }
          editingProfileHandlers.toggle();
        }}
      >
        {editingProfile ? "Save" : "Edit"}
      </Button>
    </Stack>
  );
}
