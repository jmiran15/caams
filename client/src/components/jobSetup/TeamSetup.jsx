import {
  Box,
  Stack,
  Text,
  Select,
  Group,
  Avatar,
  Card,
  Center,
} from "@mantine/core";
import { useState, useEffect, forwardRef, useContext } from "react";
import TeamRow from "../TeamRow";
import { StatusContext } from "../../context/JobStatusContext";
import { PocketbaseContext } from "../../context/PocketbaseContext";

export default function TeamSetup({ team, setTeam }) {
  const pb = useContext(PocketbaseContext);

  const status = useContext(StatusContext);
  const [associates, setAssociates] = useState([]);
  let user = pb.authStore.model;
  let list = associates.filter(
    (associate) => team.map((member) => member.id).indexOf(associate.id) === -1
  );

  // this code does NOT WORK FOR ADMIN, since admin don't have an admin field
  useEffect(() => {
    pb.collection("user")
      .getFullList({
        filter: `admin = "${
          user.isAdmin ? user.id : user.admin
        }" && role = "employer" && id != "${user.id}"`,
      })
      .then((res) => setAssociates(res))
      .catch((err) => console.log(err));
  }, []);

  function handleAdd(id) {
    setTeam((prevTeam) => {
      if (prevTeam.find((associate) => associate.id === id)) {
        return prevTeam;
      }
      return [...prevTeam, associates.find((associate) => associate.id === id)];
    });
  }

  const SelectItem = forwardRef(
    ({ image, label, user, description, randomColor, ...other }, ref) => {
      let file = undefined;

      if (image !== "") {
        file = pb.files.getUrl(user, image);
      }

      return (
        <div ref={ref} {...other}>
          <Group noWrap>
            {/* {file ? (
              <Avatar src={file} radius="xl" size="md" />
            ) : (
              <Avatar
                variant="filled"
                radius="xl"
                size="md"
                color={randomColor}
              >
                {label.split(" ")[0].slice(0, 1).toUpperCase()}{" "}
                {label.split(" ")[1].slice(0, 1).toUpperCase()}
              </Avatar>
            )} */}
            <div>
              <Text size="sm">{label}</Text>
              <Text size="xs" opacity={0.65}>
                {description}
              </Text>
            </div>
          </Group>
        </div>
      );
    }
  );

  return (
    <Box>
      <Stack>
        <Select
          size="md"
          label="Choose a user to add"
          placeholder="Select a user"
          itemComponent={SelectItem}
          data={list.map((associate) => {
            return {
              image: associate.avatar,
              user: associate,
              label: `${associate.firstName} ${associate.lastName}`,
              value: associate.id,
              description: associate.email,
              randomColor: "red.3",
            };
          })}
          onChange={handleAdd}
          searchable
          maxDropdownHeight={400}
          nothingFound="Nobody here"
          disabled={status?.status ? status.status !== "draft" : false}
          filter={(value, item) =>
            item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
            item.description.toLowerCase().includes(value.toLowerCase().trim())
          }
        />

        {team.length ? (
          <Stack spacing="sm">
            {team.map((member) => (
              <TeamRow key={member.id} teamMember={member} setTeam={setTeam} />
            ))}
          </Stack>
        ) : (
          <Card withBorder radius="md" padding="md">
            <Center>
              <Text>There are no members with access</Text>
            </Center>
          </Card>
        )}
      </Stack>
    </Box>
  );
}
