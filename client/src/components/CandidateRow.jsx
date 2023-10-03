import {
  Text,
  Group,
  Badge,
  Card,
  useMantineTheme,
  Checkbox,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { PocketbaseContext } from "../context/PocketbaseContext";

export default function CandidateRow({
  data,
  selectable,
  selectedApplications,
  setSelectedApplications,
}) {
  const pb = useContext(PocketbaseContext);
  const navigate = useNavigate();
  const {
    isRejected,
    seenBy,
    expand: { user, stage },
  } = data;
  const { applicationid } = useParams(); // to highlight the selected applicant
  const { hovered, ref } = useHover();
  const theme = useMantineTheme();
  let checked = selectedApplications.includes(data.id);
  let employer = pb.authStore.model;

  let seen = seenBy.includes(employer.id);

  const onClickApplication = () =>
    selectable ? handleSelectApplication() : handleNavigateToApplication();

  function handleNavigateToApplication() {
    setSelectedApplications([data.id]);
    navigate(`${data.id}`);
  }

  function handleSelectApplication() {
    setSelectedApplications((prev) => {
      if (prev.includes(data.id)) {
        return prev.filter((id) => id !== data.id);
      } else {
        return [...prev, data.id];
      }
    });
  }

  return (
    <Card
      withBorder
      padding="md"
      radius="md"
      ref={ref}
      style={{
        cursor: selectable ? "default" : "pointer",
        backgroundColor: hovered ? theme.colors.gray[0] : undefined,
      }}
      onClick={onClickApplication}
      bg={applicationid === data.id ? "gray.0" : ""}
    >
      <Group position="apart" align="center">
        <Group align="center">
          {selectable && <Checkbox checked={checked} readOnly />}
          {!seen && <Text>(new)</Text>}
          <Text fw={500} sx={{ lineHeight: 1 }}>
            {user.firstName} {user.lastName}
          </Text>
        </Group>
        <Badge>{isRejected ? "Rejected" : stage.label}</Badge>
      </Group>

      <Text fz="sm" c="dimmed">
        {user.email}
      </Text>
      <Text fz="sm" c="dimmed">
        {user.location}
      </Text>
      <Group spacing={7} mt={5}>
        {user.skills.map((skill) => (
          <Badge color="gray" key={skill}>
            {skill}
          </Badge>
        ))}
      </Group>
    </Card>
  );
}
