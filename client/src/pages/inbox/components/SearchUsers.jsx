import { useContext, useEffect, useState } from "react";
import { Stack } from "@mantine/core";
import { TextInput } from "@mantine/core";
import RecentMessage from "./RecentMessage";
import { PocketbaseContext } from "../../../context/PocketbaseContext";

function SearchUsers({ updateSelectedUser, close }) {
  const pb = useContext(PocketbaseContext);

  const [query, setQuery] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  const searchAllUsers = async () => {
    const records = await pb.collection("user").getFullList({});
    setAllUsers(records);
  };

  useEffect(() => {
    searchAllUsers();
  }, []);

  //filter all users to only records which have firstName or lastName containing query and have an id different from the current user
  const filteredUsers = allUsers.filter((user) => {
    return (
      (user.firstName.toLowerCase().includes(query.toLowerCase()) ||
        user.lastName.toLowerCase().includes(query.toLowerCase())) &&
      user.id !== pb.authStore.model.id
    );
  });

  return (
    <Stack>
      <TextInput
        placeholder="Search Users"
        size="md"
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
      />
      <Stack spacing="0">
        {filteredUsers.map((u) => (
          <RecentMessage
            key={u.id}
            firstname={u.firstName}
            lastname={u.lastName}
            msg={""}
            onClick={() => {
              updateSelectedUser(u);
              close();
            }}
            read={true}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default SearchUsers;
