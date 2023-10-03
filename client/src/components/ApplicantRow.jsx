import {
  Text,
  Group,
  Badge,
  Card,
  Checkbox,
  useMantineTheme,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ApplicantRow({
  data,
  selectable,
  selectedUsers,
  setSelectedUsers,
}) {
  // data is user
  const navigate = useNavigate();
  const onClickUser = () =>
    selectable ? handleSelectUser() : handleNavigateToUser();
  const { hovered, ref } = useHover();
  const theme = useMantineTheme();
  let checked = selectedUsers.includes(data.id);
  const { id } = useParams(); // to highlight the selected applicant

  function handleSelectUser() {
    setSelectedUsers((prev) => {
      if (prev.includes(data.id)) {
        return prev.filter((id) => id !== data.id);
      } else {
        return [...prev, data.id];
      }
    });
  }

  function handleNavigateToUser() {
    setSelectedUsers([data.id]);
    navigate(`${data.id}`);
  }

  return (
    <Card
      withBorder
      padding="md"
      ref={ref}
      radius="md"
      onClick={onClickUser}
      style={{
        cursor: selectable ? "default" : "pointer",
        backgroundColor: hovered ? theme.colors.gray[0] : undefined,
      }}
      bg={id === data.id ? "gray.0" : ""}
    >
      <Group>
        {selectable && <Checkbox checked={checked} readOnly />}

        <Text fw={500} mb={7} sx={{ lineHeight: 1 }}>
          {data.firstName} {data.lastName}
        </Text>
      </Group>

      <Text fz="sm" c="dimmed">
        {data.email}
      </Text>
      <Text fz="sm" c="dimmed">
        {data.location}
      </Text>
      <Group spacing={7} mt={5}>
        {data.skills.map((skill) => (
          <Badge color="gray" key={skill}>
            {skill}
          </Badge>
        ))}
      </Group>
    </Card>
  );
}
