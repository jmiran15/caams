import {
  useMantineTheme,
  Card,
  Stack,
  Title,
  Group,
  Text,
  Badge,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { stripHtml } from "string-strip-html";

const JobRow = ({ job, setJob = undefined, openFullscreen = undefined }) => {
  const { hovered, ref } = useHover();
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useMantineTheme();

  let ExperienceBadge = () =>
    job.experience && (
      <Badge
        color="gray.3"
        variant="filled"
        radius="sm"
        size="lg"
        style={{ textTransform: "none" }}
        p="sm"
      >
        <Text color="gray.7" size="sm">
          No experience
        </Text>
      </Badge>
    );

  let HourlyPayBadge = () =>
    job.payFrom !== 0 &&
    job.payTo !== 0 && (
      <Badge
        color="gray.3"
        variant="filled"
        radius="sm"
        size="lg"
        style={{ textTransform: "none" }}
        p="sm"
      >
        <Text color="gray.7" size="sm">
          From ${job.payFrom}/hr to ${job.payTo}/hr
        </Text>
      </Badge>
    );

  let SkillsBadge = () =>
    job.skills.map((skill) => (
      <Badge
        key={skill}
        color="gray.3"
        variant="filled"
        radius="sm"
        size="lg"
        style={{ textTransform: "none" }}
        p="sm"
      >
        <Text color="gray.7" size="sm">
          {skill}
        </Text>
      </Badge>
    ));

  return (
    <Card
      ref={ref}
      key={job.id}
      onClick={() => {
        if (setJob) {
          setJob(job);
          openFullscreen();
        } else {
          navigate(`${job.id}`);
        }
      }}
      withBorder
      radius="md"
      padding="lg"
      style={{
        cursor: "pointer",
        backgroundColor:
          job.id === id || (hovered && !id) ? theme.colors.gray[0] : undefined,
      }}
      bg={hovered ? theme.colors.gray[0] : undefined}
    >
      <Stack spacing="xs">
        <Stack spacing={0}>
          <Title order={3}>{job.title}</Title>
          <Text size="md" color="dimmed">
            Johns Hopkins University: Computer Science
          </Text>
          <Text size="md" color="dimmed">
            Baltimore, Md
          </Text>
        </Stack>
        <Group spacing="0.3rem">
          <ExperienceBadge />
          <HourlyPayBadge />
          <SkillsBadge />
        </Group>
        <Text lineClamp={4} suze="sm" color="dimmed">
          {/* is this library necessary? can we get the pure text from tiptap instead? */}
          {stripHtml(job.description).result}
        </Text>
      </Stack>
    </Card>
  );
};

export default JobRow;
