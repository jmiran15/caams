import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useState } from "react";
import PocketBase from "pocketbase";
import password from "secure-random-password";

const pb = new PocketBase("http://10.203.70.207:8090");
// const pb = new PocketBase("https://caamsjhu.pockethost.io");

export default function Manual({ close, admin }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  async function createUser() {
    const pass = password.randomPassword();
    pb.collection("user")
      .create({
        firstName,
        lastName,
        email,
        username,
        password: pass,
        passwordConfirm: pass,
        admin,
        isAdmin: false,
        role: "employer",
      })
      .then((user) => close())
      .catch((error) => console.log(error));
  }

  // ask user to create password the first time they login (don't have the admin set it)

  return (
    <Stack>
      <Group>
        <TextInput
          label="First name"
          value={firstName}
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
        <TextInput
          label="Last name"
          value={lastName}
          onChange={(event) => setLastName(event.currentTarget.value)}
        />
      </Group>
      <TextInput
        label="Email"
        required
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
      />
      <TextInput
        label="Username"
        required
        value={username}
        onChange={(event) => setUsername(event.currentTarget.value)}
      />
      <Button onClick={createUser}>Create user</Button>
    </Stack>
  );
}

// user gets email with their login credentials and a link to login (password they get is some type of algo)
// user logs in and is prompted to create a password
