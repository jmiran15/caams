// SELECT IS NOT WORKING CORRECTLY, NEED TO FIX

import {
  Stack,
  Grid,
  TextInput,
  ActionIcon,
  Button,
  Checkbox,
  Group,
  Modal,
  Card,
  Center,
  Text,
  useMantineTheme,
  Pagination,
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ApplicantRow from "../../../components/ApplicantRow";
import Facets from "../../../components/databaseFacets/Facets";
import { useDisclosure, useElementSize, useViewportSize } from "@mantine/hooks";
import {
  IconAdjustmentsFilled,
  IconAdjustmentsAlt,
  IconSelect,
} from "@tabler/icons-react";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import MessageMultipleUsersModal from "../../inbox/components/MessageMultipleUsersModal";
import { PocketbaseContext } from "../../../context/PocketbaseContext";
import { Sticky, StickyContainer } from "react-sticky";

function Candidates() {
  const pb = useContext(PocketbaseContext);
  const [users, setUsers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [query, setQuery] = useState("");
  const [debounced] = useDebouncedValue(query, 200);
  const [selectable, setSelectable] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);

  let filterString = "";

  if (skills.length) {
    if (filterString.length) filterString += " && ";
    filterString +=
      "(" + skills.map((s) => `skills ~ "${s}"`).join(" || ") + ")";
  }

  if (filterString.length) filterString += " && ";
  filterString += `(visible = true)`;

  if (filterString.length) filterString += " && ";
  filterString += `(role = "user")`;

  if (debounced !== "") {
    if (filterString.length) filterString += " && ";
    filterString += `(firstName ~ "${debounced}" || lastName ~ "${debounced}" || email ~ "${debounced}" || location ~ "${debounced}" || skills ~ "${debounced}" || experiences.title ~ "${debounced}" || experiences.employer ~ "${debounced}" || experiences.location ~ "${debounced}" || experiences.summary ~ "${debounced}" || educations.school ~ "${debounced}" || educations.field ~ "${debounced}")`;
  }

  useEffect(() => {
    pb.collection("user")
      .getList(page, 10, {
        filter: filterString,
        expand: "experiences,educations",
      })
      .then(({ totalPages, totalItems, items }) => {
        setUsers(items);
        setTotalPages(totalPages);
      });
  }, [page, filterString]);

  function handleSelectAll() {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  }

  function handleSetSelectable() {
    setSelectable(!selectable);
  }

  return (
    <Stack px={160} py="xl">
      <Stack>
        <Grid justify="space-between" align="center">
          <Grid.Col span="auto">
            <TextInput
              size="md"
              placeholder="search by name, description, etc..."
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
            />
          </Grid.Col>
          <Grid.Col span="content">
            <ActionIcon
              size="xl"
              variant="light"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? (
                <IconAdjustmentsFilled size="1.125rem" />
              ) : (
                <IconAdjustmentsAlt size="1.125rem" />
              )}
            </ActionIcon>
          </Grid.Col>
        </Grid>
        {showFilters && <Facets skills={skills} setSkills={setSkills} />}
      </Stack>
      <Group position={selectable ? "apart" : "left"}>
        <Group spacing="xs">
          <Button
            leftIcon={<IconSelect size="1rem" />}
            onClick={handleSetSelectable}
            color="blue.9"
            size="md"
            radius="md"
          >
            {selectable ? "Deselect user/s" : "Select user/s"}
          </Button>
          <Modal
            opened={opened}
            onClose={close}
            title="Message users"
            size="xl"
            // transitionProps={{ transition: "fade", duration: 200 }}
          >
            <MessageMultipleUsersModal
              selectedUsers={selectedUsers}
              close={close}
            />
          </Modal>
          <Button
            size="md"
            color="blue.9"
            radius="md"
            onClick={() => {
              if (selectedUsers.length === 0) {
                showNotification({
                  title: "No users selected",
                  message: "Select at least one user to message",
                });
              } else {
                open();
              }
            }}
          >
            Message
          </Button>
        </Group>
        {selectable && (
          <Checkbox label="Select all" onClick={handleSelectAll} />
        )}
      </Group>
      <StickyContainer>
        <Grid gutter="sm">
          <Grid.Col span={4}>
            <Stack spacing="xs">
              {users.map((user) => {
                return (
                  <ApplicantRow
                    key={user.id}
                    data={user}
                    selectable={selectable}
                    selectedUsers={selectedUsers}
                    setSelectedUsers={setSelectedUsers}
                  />
                );
              })}
            </Stack>
          </Grid.Col>
          <Grid.Col span={8}>
            <Sticky>
              {({ style }) => (
                <div style={style}>
                  {!selectable ? (
                    selectedUsers.length ? (
                      <Outlet context={[setSelectedUsers, users]} />
                    ) : (
                      <Card withBorder radius="md" padding="md">
                        <Center>
                          <Text>Select a user to view more information.</Text>
                        </Center>
                      </Card>
                    )
                  ) : (
                    <Card withBorder radius="md" padding="md">
                      <Center>
                        <Text>
                          {selectedUsers.length
                            ? "Act on these users with the action bar."
                            : "No users selected"}
                        </Text>
                      </Center>
                    </Card>
                  )}
                </div>
              )}
            </Sticky>
          </Grid.Col>
        </Grid>
      </StickyContainer>
      <Center>
        <Pagination total={totalPages} value={page} onChange={setPage} />
      </Center>
    </Stack>
  );
}

export default Candidates;
