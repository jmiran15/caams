import {
  createStyles,
  Card,
  Group,
  Text,
  rem,
  Avatar,
  Badge,
  Stack,
  Button,
  ActionIcon,
  useMantineTheme,
  px,
  ScrollArea,
  Modal,
  Grid,
  CloseButton,
  NativeSelect,
  Textarea,
  Anchor,
} from "@mantine/core";
import { useState, useEffect, useRef, useContext } from "react";
import {
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from "react-router-dom";
import dayjs from "dayjs";
import {
  useDisclosure,
  useElementSize,
  useViewportSize,
  useIntersection,
} from "@mantine/hooks";
import Application from "./Application";
import { IconArrowsMaximize } from "@tabler/icons-react";
import MessageUserModal from "../pages/inbox/components/MessageUserModal";
import { PocketbaseContext } from "../context/PocketbaseContext";

const useStyles = createStyles((theme) => ({
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

// SAME AS PUBLICPROFILE, BUT WITH MORE (NEED TO MODULARIZE)
export default function FullPublicProfile() {
  const pb = useContext(PocketbaseContext);
  const [setSelectedApplications, applications] = useOutletContext();
  const employer = pb.authStore.model;
  const navigate = useNavigate();
  const { id, applicationid } = useParams(); // application id
  const { classes } = useStyles();

  const containerRef = useRef();

  const [user, setUser] = useState({});
  const [application, setApplication] = useState({});
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);

  const [feedbacks, setFeedbacks] = useState([]);
  const [scorecards, setScorecards] = useState([]);

  const [fullscreen, { open: openFullscreen, close: closeFullscreen }] =
    useDisclosure(false, {
      onOpen: () => {},
      onClose: () => {
        navigate(`/instructor/jobs/${id}/candidates/${applicationid}`);
      },
    });

  const [openedMessage, { open: openMessage, close: closeMessage }] =
    useDisclosure(false);
  useEffect(() => {
    pb.collection("feedback")
      .getFullList({
        filter: `application = "${applicationid}"`,
        sort: "-created",
        expand: "employer",
      })
      .then((feedbacks) => {
        setFeedbacks(feedbacks);
      })
      .catch((e) => console.log(e));

    pb.collection("scorecards")
      .getFullList({
        filter: `application = "${applicationid}"`,
        sort: "-created",
        expand: "createdBy",
      })
      .then((scorecards) => {
        setScorecards(scorecards);
      })
      .catch((e) => console.log(e));
  }, [applicationid]);

  useEffect(() => {
    pb.collection("application")
      .getOne(applicationid, {
        expand: "user, stage",
      })
      .then((application) => {
        // let { user } = application.expand;
        let {
          expand: { user },
          seenBy,
        } = application;
        setApplication(application);
        setUser(user);

        // employer has not seen this application before, and has just opened it, so we add them to seenBy
        if (!seenBy.includes(employer.id)) {
          pb.collection("application")
            .update(applicationid, {
              seenBy: [...seenBy, employer.id],
            })
            .then(() => console.log("added employer to seenBy"))
            .catch((e) => console.log(e));
        }

        Promise.all([
          pb.collection("experience").getFullList({
            sort: "-to",
            filter: `user = "${user.id}"`,
          }),
          pb.collection("education").getFullList({
            sort: "-to",
            filter: `user = "${user.id}"`,
          }),
        ]).then(([experiences, educations]) => {
          setExperiences(experiences);
          setEducations(educations);
        });
      })
      .catch((e) => console.log(e));
  }, [applicationid, employer.id]);

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

  // ON CLICK EXPAND OPEN A FULL SCREEN MODAL

  const { height } = useViewportSize();
  const theme = useMantineTheme();

  const { ref, width, height: actionBarHeight } = useElementSize();
  let stickyHeight = height - px(theme.spacing.xl);
  let scrollHeight =
    stickyHeight -
    actionBarHeight -
    2 * px(theme.spacing.lg) -
    px(theme.spacing.xl);

  function handleOpenFullscreen() {
    navigate("?fullscreen=true");
  }

  // get search params and openFullscreen based on this
  const [searchParams] = useSearchParams();
  let fullscreenParam = searchParams.get("fullscreen"); // job id if from a template, o/w null

  useEffect(() => {
    if (fullscreenParam) {
      openFullscreen();
    }
  }, [fullscreenParam, openFullscreen]);

  function handleNextApplicant() {
    // navigate to next applicant
    let index = applications.findIndex((app) => app.id === applicationid);
    let nextIndex = index + 1;
    let nextApplication = applications[nextIndex];
    if (nextApplication) {
      navigate(
        `/instructor/jobs/${id}/candidates/${nextApplication.id}?fullscreen=true`
      );
    }
  }

  return (
    <>
      <Modal
        opened={fullscreen}
        onClose={closeFullscreen}
        size="100%"
        // transitionProps={{ transition: "fade", duration: 200 }}
      >
        <Grid>
          <Grid.Col span={8}>
            <Stack bg="gray.0" w="100%">
              <ScrollArea h="60vh">
                <Stack>
                  <Group>
                    {/* <Avatar radius="50%" size="5em" src={user.avatar} /> */}
                    <Stack spacing="xs">
                      <Text
                        fz="1.5rem"
                        className={classes.title}
                        fw={500}
                        pb="sm"
                      >
                        {user.firstName} {user.lastName}
                      </Text>

                      <Text size="sm" color="dimmed">
                        {user.email}
                      </Text>
                      <Text size="sm" color="dimmed">
                        {user.location}
                      </Text>
                    </Stack>
                  </Group>
                </Stack>

                <Stack spacing="xl">
                  <Stack>
                    <Text fz="lg" className={classes.title} fw={500}>
                      Education
                    </Text>
                    {educationRows}
                  </Stack>
                  <Stack>
                    <Text fz="lg" className={classes.title} fw={500}>
                      Experience
                    </Text>
                    {experienceRows}
                  </Stack>
                  <Stack>
                    <Text fz="lg" className={classes.title} fw={500}>
                      Skills
                    </Text>
                    <Group spacing={7}>{skills}</Group>
                  </Stack>
                  <Stack>
                    <Text fz="lg" className={classes.title} fw={500}>
                      Application
                    </Text>
                    <Application applicationId={applicationid} />
                  </Stack>
                  <Stack>
                    <Text fz="lg" className={classes.title} fw={500}>
                      Feedback
                    </Text>
                    <Stack spacing={7}>
                      {feedbacks.length > 0 &&
                        feedbacks.map((record) => (
                          <Stack key={record.id}>
                            <Text>{record.employer}</Text>
                            <Text>{record.feedback}</Text>
                          </Stack>
                        ))}
                    </Stack>
                  </Stack>
                  <Stack>
                    <Text fz="lg" className={classes.title} fw={500}>
                      Scorecards
                    </Text>
                    <Stack spacing={7}>
                      {scorecards.length > 0 &&
                        scorecards.map((record) => (
                          <Stack key={record.id}>
                            <Text>{record.createdBy}</Text>
                            <Text>{JSON.stringify(record.scorecard)}</Text>
                          </Stack>
                        ))}
                    </Stack>
                  </Stack>
                </Stack>
              </ScrollArea>
            </Stack>
          </Grid.Col>
          <Grid.Col span="auto">
            <Stack bg="gray.3" h="100vh" align="flex-start">
              <Button
                color="blue.9"
                size="md"
                radius="md"
                onClick={handleNextApplicant}
              >
                <Group align="center">
                  <Text>View next applicant</Text>
                </Group>
              </Button>
              <Button color="blue.9" size="md" radius="md">
                <Group align="center">
                  <Text>Reject applicant</Text>
                </Group>
              </Button>
              {/* Should be able to change stage from here */}
              <NativeSelect
                size="md"
                placeholder="Select stage"
                data={["stage", "stage"]}
              />

              <Textarea
                placeholder="leave a feedback message"
                minRows={2}
                maxRows={4}
                autosize
              />
              <Button>Send feedback</Button>

              {/* load the scorecard format here */}
            </Stack>
          </Grid.Col>
        </Grid>
      </Modal>
      <Modal
        opened={openedMessage}
        onClose={closeMessage}
        title="Send a message"
        size="xl"
        // transitionProps={{ transition: "fade", duration: 200 }}
      >
        <MessageUserModal selectedUser={user} />
      </Modal>
      <Card withBorder radius="md" w="100%" mah={stickyHeight}>
        <Card.Section withBorder inheritPadding p="lg" ref={ref}>
          <Stack>
            <Group w="100%" align="flex-start" position="apart">
              <Group>
                {/* <Avatar radius="50%" size="5em" src={user.avatar} /> */}
                <Stack spacing="xs">
                  <Anchor
                    fz="1.5rem"
                    className={classes.title}
                    fw={500}
                    pb="sm"
                    onClick={openMessage}
                  >
                    {user.firstName} {user.lastName}
                  </Anchor>
                  <Text size="sm" color="dimmed">
                    {user.location}
                  </Text>
                </Stack>
              </Group>
              <CloseButton
                aria-label="Close modal"
                onClick={() => {
                  setSelectedApplications([]);
                  navigate(`/instructor/jobs/${id}/candidates`);
                }}
                size="lg"
                iconSize={20}
              />
            </Group>
            <Group>
              {/* <ActionIcon
                size="xl"
                disabled
                radius="md"
                variant="light"
                onClick={handleOpenFullscreen}
              >
                <IconArrowsMaximize size="1.625rem" />
              </ActionIcon> */}
            </Group>
          </Stack>
        </Card.Section>
        <ScrollArea h={scrollHeight} maw={width} px="lg" ref={containerRef}>
          <Card.Section inheritPadding w="100%" py="lg">
            <Text fz="lg" className={classes.title} fw={500} mb="xl">
              Education
            </Text>
            {educationRows}
          </Card.Section>
          <Card.Section withBorder inheritPadding w="100%" py="lg">
            <Text fz="lg" className={classes.title} fw={500} mb="xl">
              Experience
            </Text>
            {experienceRows}
          </Card.Section>
          <Card.Section withBorder inheritPadding w="100%" py="lg">
            <Text fz="lg" className={classes.title} fw={500} mb="xl">
              Skills
            </Text>
            <Group spacing={7} mt={5}>
              {skills}
            </Group>
          </Card.Section>
          <Card.Section withBorder inheritPadding w="100%" py="lg">
            <Text fz="lg" className={classes.title} fw={500} mb="xl">
              Application
            </Text>
            <Application applicationId={applicationid} />
          </Card.Section>
          <Card.Section withBorder inheritPadding w="100%" py="lg">
            <Text fz="lg" className={classes.title} fw={500} mb="xl">
              Feedback
            </Text>
            <Stack spacing={7} mt={5}>
              {feedbacks.length > 0 &&
                feedbacks.map((record) => (
                  <Feedback
                    key={record.id}
                    record={record}
                    containerRef={containerRef}
                    pb={pb}
                  />
                ))}
            </Stack>
          </Card.Section>
          <Card.Section inheritPadding w="100%" py="lg">
            <Text fz="lg" className={classes.title} fw={500} mb="xl">
              Scorecards
            </Text>
            <Stack spacing={7} mt={5}>
              {scorecards.length > 0 &&
                scorecards.map((record) => (
                  <Scorecard
                    key={record.id}
                    record={record}
                    containerRef={containerRef}
                    pb={pb}
                  />
                ))}
            </Stack>
          </Card.Section>
        </ScrollArea>
      </Card>
    </>
  );
}

function Feedback({ record, containerRef, pb }) {
  const { classes } = useStyles();

  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.5, // this doesnt work if its 1.0 (100% of view) for some reason
  });

  // if it is seen, we check if the current user is in seenBy, if it is not, we add it to seenBy

  if (entry?.isIntersecting) {
    if (record.seenBy.includes(pb.authStore.model.id)) {
    } else {
      pb.collection("feedback")
        .update(record.id, {
          seenBy: [...record.seenBy, pb.authStore.model.id],
        })
        .then(() => console.log("added to seenBy"))
        .catch((e) => console.log(e));
    }
  }

  return (
    <Stack
      key={record.id}
      // bg={entry?.isIntersecting ? "red.1" : "green.1"}
      ref={ref}
      spacing="xs"
      className={classes.item}
    >
      <Text>
        {record.expand.employer.firstName} {record.expand.employer.lastName}
      </Text>
      <Text>{record.feedback}</Text>
    </Stack>
  );
}

function Scorecard({ record, containerRef, pb }) {
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.5,
  });

  const { classes } = useStyles();

  if (entry?.isIntersecting) {
    if (record.seenBy.includes(pb.authStore.model.id)) {
      console.log("already seen");
    } else {
      pb.collection("scorecards")
        .update(record.id, {
          seenBy: [...record.seenBy, pb.authStore.model.id],
        })
        .then(() => console.log("added to seenBy"))
        .catch((e) => console.log(e));
    }
  }

  let orderedSc = record.scorecard.sort(function (a, b) {
    return a.position - b.position;
  });

  return (
    <Stack
      key={record.id}
      // bg={entry?.isIntersecting ? "red.1" : "green.1"}
      ref={ref}
      className={classes.item}
    >
      <Text>
        {record.expand.createdBy.firstName} {record.expand.createdBy.lastName}
      </Text>
      <Stack>
        {orderedSc.map((item) => (
          <Stack key={item.id}>
            <Text>{item.label}</Text>
            <Text>{item.value}</Text>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
