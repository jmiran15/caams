import { useContext, useEffect, useState } from "react";
import { Card, Text, Stack, Grid } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import RecentMessages from "./RecentMessages";
import { ActionIcon, TextInput } from "@mantine/core";
import { Send } from "tabler-icons-react";
import { StepOut } from "tabler-icons-react";
import { PocketbaseContext } from "../context/PocketbaseContext";

function RecentMessageList({
  firstname,
  lastname,
  msg,
  selectedUser,
  recentUsers,
  updateSelectedUser,
  searchingUsers,
  updateSearchingUsers,
}) {
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
    <>
      <Card>
        <Stack>
          {searchingUsers ? (
            <Grid columns={10}>
              <Grid.Col span={9}>
                <Text size="lg" fw={700}>
                  Messages
                </Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <ActionIcon
                  align="right"
                  onClick={() => {
                    updateSearchingUsers(false);
                  }}
                >
                  <StepOut size="1.125rem" />
                </ActionIcon>
              </Grid.Col>
            </Grid>
          ) : (
            <Grid columns={10}>
              <Grid.Col span={9}>
                <Text size="lg" fw={700}>
                  Messages
                </Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <ActionIcon
                  align="right"
                  onClick={() => {
                    updateSearchingUsers(true);
                  }}
                >
                  <Send size="1.125rem" />
                </ActionIcon>
              </Grid.Col>
            </Grid>
          )}

          {searchingUsers ? (
            <>
              <TextInput
                placeholder="Search Users"
                value={query}
                onChange={(event) => setQuery(event.currentTarget.value)}
              />
              <RecentMessages
                selectedUser={selectedUser}
                recentUsers={recentUsers}
                updateSelectedUser={updateSelectedUser}
                searchingUsers={searchingUsers}
                searchedUsers={filteredUsers}
              />
            </>
          ) : (
            <RecentMessages
              selectedUser={selectedUser}
              recentUsers={recentUsers}
              updateSelectedUser={updateSelectedUser}
              searchingUsers={searchingUsers}
            />
          )}
        </Stack>
      </Card>
    </>
  );
}

export default RecentMessageList;
