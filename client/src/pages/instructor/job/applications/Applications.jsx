import {
  Stack,
  Grid,
  Button,
  Group,
  TextInput,
  ActionIcon,
  Checkbox,
  Card,
  Center,
  Text,
  MultiSelect,
  Menu,
  Modal,
  Textarea,
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { useParams, Outlet, useNavigate } from "react-router-dom";
import CandidateCard from "../../../../components/CandidateRow";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import {
  IconBan,
  IconChevronDown,
  IconMessage,
  IconSelect,
} from "@tabler/icons-react";
import { Sticky, StickyContainer } from "react-sticky";
import { PocketbaseContext } from "../../../../context/PocketbaseContext";

// import Kanban from "../../../../components/Board";

export default function Applications() {
  const pb = useContext(PocketbaseContext);
  let user = pb.authStore.model;
  const { id } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [stages, setStages] = useState([]);
  const [view, setView] = useState("list");
  const [query, setQuery] = useState("");
  const [debounced] = useDebouncedValue(query, 200);
  const [selectable, setSelectable] = useState(false);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [filterStage, setFilterStage] = useState("all");
  const [openedFeedback, { open: openFeedack, close: closeFeedback }] =
    useDisclosure(false);
  const [openedScorecard, { open: openScorecard, close: closeScorecard }] =
    useDisclosure(false);
  const [feedback, setFeedback] = useState("");
  const [scorecardItems, setScorecardItems] = useState([]);
  const [scorecard, setScorecard] = useState([]);

  useEffect(() => {
    pb.collection("scorecardItems")
      .getFullList({
        filter: `job = "${id}"`,
        sort: "+position",
      })
      .then((items) => {
        setScorecardItems(items);
      });
  }, [id]);

  useEffect(() => {
    // create the initial scorecard
    setScorecard(
      scorecardItems.map((item) => {
        return {
          id: item.id,
          position: item.position,
          label: item.label,
          value: "",
        };
      })
    );
  }, [scorecardItems]);

  let selectedOne = selectedApplications.length === 1;
  let selectedNone = selectedApplications.length === 0;

  const filter = (stageId) => {
    let filterString = "";

    if (filterString.length) filterString += " && ";
    filterString += `(stage = "${stageId}")`;

    if (filterString.length) filterString += " && ";
    filterString += `(status = "submitted")`;

    if (debounced !== "") {
      if (filterString.length) filterString += " && ";
      filterString += `(user.firstName ~ "${debounced}" || user.lastName ~ "${debounced}" || user.email ~ "${debounced}" || user.location ~ "${debounced}" || user.skills ~ "${debounced}" || user.experiences.title ~ "${debounced}" || user.experiences.employer ~ "${debounced}" || user.experiences.location ~ "${debounced}" || user.experiences.summary ~ "${debounced}" || user.educations.school ~ "${debounced}" || user.educations.field ~ "${debounced}")`;
    }

    if (filterStage.length) {
      if (!filterStage.includes("all")) {
        if (filterString.length) filterString += " && ";

        if (!filterStage.includes("rejected")) {
          filterString += `(isRejected = false) && `;
        }

        filterString +=
          "(" +
          filterStage
            .map((s) => {
              if (s === "rejected") return "(isRejected = true)";
              return `(stage = "${s}")`;
            })
            .join(" || ") +
          ")";
      }
    }

    return filterString;
  };

  // same code as used in dashboard (export to custom hook)
  // We have a view collection applicationsView which can be used to simplify this code.
  useEffect(() => {
    pb.collection("stage")
      .getFullList({
        sort: "+position",
        filter: `job = "${id}"`,
      })
      .then((stages) => {
        setStages(stages);

        if (stages.length > 0) {
          Promise.all(
            stages.map((stage) =>
              pb.collection("application").getFullList({
                filter: filter(stage.id), // this is the filter
                sort: "-created",
                expand: "user,stage,user.experiences,user.educations",
                $cancelKey: stage.id, // for multiple requests without auto-cancellation
              })
            )
          ).then((applications) => setApplications(applications.flat()));
        }
      });
  }, [id, debounced, filterStage, selectedApplications]);

  function handleSelectAll() {
    if (selectedApplications.length === applications.length) {
      setSelectedApplications([]);
    } else {
      setSelectedApplications(
        applications.map((application) => application.id)
      );
    }
  }

  function handleChangeApplicationStage(selectedStage) {
    // promise.all through the selected applications and update their stage to the selected change stage
    Promise.all(
      selectedApplications.map((applicationId) =>
        pb.collection("application").update(applicationId, {
          stage: selectedStage,
        })
      )
    ).then(() => {
      setSelectable(false);
      setSelectedApplications([]);
    });
  }

  function handleReject() {
    // go through all of the application ids in selectedApplications and set their isRejected attribute to true
    Promise.all(
      selectedApplications.map((applicationId) =>
        pb.collection("application").update(applicationId, {
          isRejected: true,
        })
      )
    ).then(() => {
      setSelectable(false);
      setSelectedApplications([]);
    });
  }

  function handleSetSelectable() {
    setSelectable(!selectable);
    navigate(`/instructor/jobs/${id}/candidates`);
  }

  function handleLeaveFeedback() {
    if (selectedApplications.length === 1) {
      const applicationId = selectedApplications[0];

      pb.collection("feedback")
        .create({
          feedback,
          application: applicationId,
          employer: user.id,
        })
        .then(() => {
          closeFeedback();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleLeaveScorecard() {
    if (selectedApplications.length === 1) {
      const applicationId = selectedApplications[0];

      pb.collection("scorecards")
        .create({
          application: applicationId,
          createdBy: user.id,
          scorecard: JSON.stringify(scorecard),
        })
        .then(() => {
          closeScorecard();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <Stack px={160} py="xl">
      <Modal
        opened={openedFeedback}
        onClose={closeFeedback}
        title="Leave feedback"
        size="xl"
        // transitionProps={{ transition: "fade", duration: 200 }}
      >
        <Stack>
          <Textarea
            placeholder="Leave feedback here..."
            autosize
            value={feedback}
            onChange={(event) => setFeedback(event.currentTarget.value)}
            minRows={3}
            maxRows={6}
          />
          <Button
            color="blue.9"
            radius="md"
            style={{
              alignSelf: "flex-end",
            }}
            onClick={handleLeaveFeedback}
          >
            Save
          </Button>
        </Stack>
      </Modal>
      <Modal
        opened={openedScorecard}
        onClose={closeScorecard}
        title="Leave scorecard"
        size="xl"
        // transitionProps={{ transition: "fade", duration: 200 }}
      >
        <Stack>
          {scorecard.length &&
            scorecardItems.map((item) => (
              <Textarea
                key={item.id}
                label={item.label}
                placeholder={item.label}
                autosize
                value={scorecard.find((s) => s.id === item.id).value}
                onChange={(event) =>
                  setScorecard((prev) => {
                    let newScorecard = [...prev];
                    let index = newScorecard.findIndex((s) => s.id === item.id);
                    newScorecard[index].value = event.currentTarget.value;
                    return newScorecard;
                  })
                }
                minRows={1}
                maxRows={2}
              />
            ))}
          <Button
            color="blue.9"
            radius="md"
            style={{
              alignSelf: "flex-end",
            }}
            onClick={handleLeaveScorecard}
          >
            Save
          </Button>
        </Stack>
      </Modal>

      {applications.length > 0 ? (
        <>
          <Grid justify="space-between" align="center" w="100%" gutter={0}>
            <Grid.Col span="auto" pr="sm">
              <TextInput
                radius="md"
                placeholder="search by name, description, etc..."
                value={query}
                onChange={(event) => setQuery(event.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span="content">
              <MultiSelect
                defaultValue={["all"]}
                radius="md"
                placeholder="Filter by stage"
                data={[
                  {
                    value: "all",
                    label: "All",
                  },
                  ...stages.map((stage) => {
                    return {
                      value: stage.id,
                      label: stage.label,
                    };
                  }),
                  {
                    value: "rejected",
                    label: "Rejected",
                  },
                ]}
                value={filterStage}
                onChange={setFilterStage}
              />
            </Grid.Col>
          </Grid>

          <Group position="apart">
            <Group>
              <ActionIcon
                variant="filled"
                color="blue.9"
                size="lg"
                radius="md"
                onClick={handleSetSelectable}
              >
                <IconSelect size="1.125rem" />
              </ActionIcon>

              {/* <ActionIcon
                variant="filled"
                color="blue.9"
                size="lg"
                radius="md"
                disabled={selectedNone}
              >
                <IconMessage size="1.125rem" />
              </ActionIcon> */}
              <ActionIcon
                variant="filled"
                color="blue.9"
                size="lg"
                radius="md"
                disabled={selectedNone}
                onClick={handleReject}
              >
                <IconBan size="1.125rem" />
              </ActionIcon>
              <ButtonMenu
                selectedNone={selectedNone}
                stages={stages}
                handleChangeApplicationStage={handleChangeApplicationStage}
              />

              <Button
                color="blue.9"
                radius="md"
                disabled={selectedNone || !selectedOne}
                onClick={openFeedack}
              >
                Leave feedback
              </Button>
              <Button
                color="blue.9"
                radius="md"
                disabled={selectedNone || !selectedOne}
                onClick={openScorecard}
              >
                Leave scorecard
              </Button>

              {/* add tooltops */}
            </Group>
            {selectable && (
              <Checkbox label="Select all" onClick={handleSelectAll} />
            )}
          </Group>

          <StickyContainer>
            {view === "list" ? (
              <Grid gutter="sm">
                <Grid.Col span={4}>
                  <Stack direction="column" spacing="xs">
                    {applications.map((application) => {
                      return (
                        <CandidateCard
                          key={application.id}
                          data={application}
                          selectable={selectable}
                          selectedApplications={selectedApplications}
                          setSelectedApplications={setSelectedApplications}
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
                          selectedApplications.length ? (
                            <Outlet
                              context={[setSelectedApplications, applications]}
                            />
                          ) : (
                            <Card withBorder radius="md" padding="md">
                              <Center>
                                <Text>
                                  Select an application to view more
                                  information.
                                </Text>
                              </Center>
                            </Card>
                          )
                        ) : (
                          <Card withBorder radius="md" padding="md">
                            <Center>
                              <Text>
                                {selectedApplications.length
                                  ? "Act on these applications with the action bar."
                                  : "No applications selected"}
                              </Text>
                            </Center>
                          </Card>
                        )}
                      </div>
                    )}
                  </Sticky>
                </Grid.Col>
              </Grid>
            ) : (
              // <Kanban jobId={id} />
              <></>
            )}
          </StickyContainer>
        </>
      ) : (
        <Card withBorder radius="md" padding="md">
          <Center>
            <Text>
              This job has no applications, you will see them here when they
              come in.
            </Text>
          </Center>
        </Card>
      )}
    </Stack>
  );
}

function ButtonMenu({ selectedNone, handleChangeApplicationStage, stages }) {
  return (
    <Menu
      transitionProps={{ transition: "pop-top-right" }}
      position="top-end"
      width={220}
      withinPortal
    >
      <Menu.Target>
        <Button
          rightIcon={<IconChevronDown size="1.05rem" stroke={1.5} />}
          pr={12}
          disabled={selectedNone}
          color="blue.9"
          radius="md"
        >
          Change application stage
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {stages.map((stage) => {
          return (
            <Menu.Item
              key={stage.id}
              onClick={() => {
                handleChangeApplicationStage(stage.id);
              }}
            >
              {stage.label}
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
}
