import {
  createStyles,
  Card,
  Group,
  Text,
  rem,
  Avatar,
  Badge,
  Stack,
  Modal,
  Anchor,
  useMantineTheme,
  ScrollArea,
  px,
} from "@mantine/core";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useDisclosure, useElementSize, useViewportSize } from "@mantine/hooks";
import MessageUserModal from "../pages/inbox/components/MessageUserModal";
import { PocketbaseContext } from "../context/PocketbaseContext";
import dayjs from "dayjs";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  item: {
    "& + &": {
      paddingTop: theme.spacing.sm,
      marginTop: theme.spacing.sm,
      borderTop: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },
  },

  title: {
    lineHeight: 1,
  },
}));

export default function PublicProfile() {
  const { id } = useParams();
  const pb = useContext(PocketbaseContext);
  const { classes } = useStyles();
  const [user, setUser] = useState({});
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    Promise.all([
      pb.collection("user").getOne(id),
      pb.collection("experience").getFullList({
        sort: "-to",
        filter: `user = "${id}"`,
      }),
      pb.collection("education").getFullList({
        sort: "-to",
        filter: `user = "${id}"`,
      }),
    ]).then(([user, experiences, educations]) => {
      setUser(user);
      setExperiences(experiences);
      setEducations(educations);
    });
  }, [id]);

  const skills = user.skills?.map((skill) => (
    <Badge color="gray" key={skill}>
      {skill}
    </Badge>
  ));

  const educationRows = educations?.map((education) => {
    let fromDate = dayjs(education.from).format("MMMM D, YYYY");
    let toDate = dayjs(education.to).format("MMMM D, YYYY");

    return (
      <Group className={classes.item} noWrap spacing="xl" key={education.id}>
        <Stack spacing="xs">
          <Text>{education.school}</Text>
          <Text size="xs" color="dimmed">
            {education.field}
          </Text>
          <Group>
            <Text size="xs" color="dimmed">
              {fromDate}
            </Text>
            <Text size="xs" color="dimmed">
              {toDate}
            </Text>
          </Group>
        </Stack>
      </Group>
    );
  });

  const experienceRows = experiences?.map((experience) => {
    let fromDate = dayjs(experience.from).format("MMMM D, YYYY");
    let toDate = dayjs(experience.to).format("MMMM D, YYYY");

    return (
      <Group className={classes.item} noWrap spacing="xl" key={experience.id}>
        <Stack spacing="xs">
          <Text>
            {experience.title} | {experience.employer}
          </Text>
          <Group>
            <Text size="xs" color="dimmed">
              {fromDate}
            </Text>
            <Text size="xs" color="dimmed">
              {toDate}
            </Text>
          </Group>
          <Text size="xs" color="dimmed">
            {experience.summary}
          </Text>
        </Stack>
      </Group>
    );
  });

  const { height } = useViewportSize();
  const theme = useMantineTheme();
  const { ref, width, height: actionBarHeight } = useElementSize();
  let stickyHeight = height - px(theme.spacing.xl);
  let scrollHeight =
    stickyHeight -
    actionBarHeight -
    2 * px(theme.spacing.lg) -
    px(theme.spacing.xl);

  return (
    <Card
      withBorder
      radius="md"
      className={classes.card}
      w="100%"
      h={stickyHeight}
    >
      <Card.Section withBorder inheritPadding p="lg" ref={ref}>
        <Stack>
          <Group>
            {/* <Avatar radius="50%" size="5em" src={user.avatar} /> */}
            <Stack spacing="xs">
              <Anchor
                fz="1.5rem"
                className={classes.title}
                fw={500}
                pb="sm"
                onClick={open}
              >
                {user.firstName} {user.lastName}
              </Anchor>
              <Text size="sm" color="dimmed">
                {user.email}
              </Text>
              <Text size="sm" color="dimmed">
                {user.location}
              </Text>
            </Stack>
            <Modal
              opened={opened}
              onClose={close}
              title="Send a message"
              size="xl"
              // transitionProps={{ transition: "fade", duration: 200 }}
            >
              <MessageUserModal selectedUser={user} />
            </Modal>
          </Group>
        </Stack>
      </Card.Section>
      <ScrollArea h={scrollHeight} maw={width} px="lg">
        <Card.Section inheritPadding w="100%" py="lg">
          <Text fz="lg" className={classes.title} fw={500} mb="xl">
            Education
          </Text>
          {educationRows}
        </Card.Section>
        <Card.Section withBorder inheritPadding p="lg" w="100%">
          <Text fz="lg" className={classes.title} fw={500} mb="xl">
            Experience
          </Text>
          {experienceRows}
        </Card.Section>
        <Card.Section inheritPadding p="lg" w="100%">
          <Text fz="lg" className={classes.title} fw={500} mb="xl">
            Skills
          </Text>
          <Group spacing={7} mt={5}>
            {skills}
          </Group>
        </Card.Section>
      </ScrollArea>
    </Card>
  );
}
