import { useContext, useEffect, useState } from "react";
import JobRow from "../../../components/JobRow";
import { useNavigate } from "react-router-dom";
import { IconAdjustmentsFilled, IconAdjustmentsAlt } from "@tabler/icons-react";
import {
  Stack,
  Pagination,
  Grid,
  Checkbox,
  Card,
  TextInput,
  ActionIcon,
  createStyles,
  Button,
  Menu,
  Center,
  Group,
  rem,
  Text,
  Modal,
  useMantineTheme,
} from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import {
  IconTrash,
  IconChevronDown,
  IconBriefcase,
  IconTemplate,
  IconSelect,
} from "@tabler/icons-react";
import Facets from "../../../components/instructorJobsFacets/InstructorJobsFacets";
import { PocketbaseContext } from "../../../context/PocketbaseContext";

// TODO - SELECT ALL IS BUGGY, NOT IN SYNCH WITH SELECTED JOBS, ALSO, ONLY SELECTS JOBS ON CURRENT PAGE

const useStyles = createStyles((theme) => ({
  button: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  menuControl: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    border: 0,
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },
}));

export default function Jobs() {
  const pb = useContext(PocketbaseContext);
  let user = pb.authStore.model;
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const [jobs, setJobs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectable, setSelectable] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(undefined);
  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);
  const [
    openedChangeStatus,
    { open: openChangeStatus, close: closeChangeStatus },
  ] = useDisclosure(false);
  const [selectedStatus, setSelectedStatus] = useState(undefined);
  const [query, setQuery] = useState("");
  const [debounced] = useDebouncedValue(query, 200);
  const [statusFilter, setStatusFilter] = useState([]);
  const [createdByFilter, setCreatedByFilter] = useState([]);
  const [templateFilter, setTemplateFilter] = useState([]);

  // Search and filters code is very similar in all lists, we should extract it into a hook.

  let actionsEnabled = selectedJobs.length > 0;

  let filterString = `(team ~ "${user.id}" || createdBy = "${user.id}") && isTemplate = false`;
  filterString += ` && (title ~ "${debounced}" || description ~ "${debounced}")`;

  // Check if array is not empty, then join elements with "||"
  if (statusFilter.length) {
    if (filterString.length) filterString += " && ";
    filterString +=
      "(" + statusFilter.map((s) => `status = "${s}"`).join(" || ") + ")";
  }

  if (createdByFilter.length) {
    if (filterString.length) filterString += " && ";
    filterString +=
      "(" + createdByFilter.map((c) => `createdBy = "${c}"`).join(" || ") + ")";
  }

  if (templateFilter.length) {
    if (filterString.length) filterString += " && ";
    filterString +=
      "(" +
      templateFilter.map((t) => `templateUsed = "${t}"`).join(" || ") +
      ")";
  }

  // WE COULD PROBABLY FETCH TEMPLATES IN HERE AND PASS AS PROP TO OTHER COMPONENTS THAT NEED IT
  // - CREATE JOB FROM MODAL
  // - TEMPLATE FACET

  function handleOpenTemplatesModal() {
    open();
    pb.collection("jobs")
      .getFullList({
        sort: "-created",
        expand: "createdBy",
        filter: `(team ~ "${user.id}" || createdBy = "${user.id}") && isTemplate = true`,
      })
      .then((templates) => setTemplates(templates))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    pb.collection("jobs")
      .getList(page, 10, {
        sort: "-created",
        expand: "createdBy",
        filter: filterString,
      })
      .then(({ totalPages, items }) => {
        setJobs(items);
        setTotalPages(totalPages);
      });
  }, [page, openedDelete, openedChangeStatus, filterString]);

  function handleSetSelectable() {
    setSelectable(!selectable);
  }

  function handleSelectAll() {
    if (selectedJobs.length === jobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(jobs.map((job) => job.id));
    }
  }

  function handleContinueFromTemplate() {
    if (selectedTemplate) {
      navigate(`/instructor/newjob?from=${selectedTemplate}`);
    }
  }

  // we should probably actually delete jobs at some point (i.e. after x days of being safe deleted)
  // should be able to see my deleted jobs in settings and restore them
  function handleDeleteJobs() {
    // show a notification/alert when the jobs are deleted
    Promise.all(
      selectedJobs.map((jobId) =>
        pb
          .collection("jobs")
          .update(jobId, {
            isDeleted: true,
          })
          .then((res) => res)
      )
    ).then((res) => {
      closeDelete();
      setSelectable(false);
      setSelectedJobs([]);
    });
  }

  function handleChangeJobStatus() {
    // should change status of all selected jobs.
    // if user is admin, "active" should be a status, o/w not (i.e. regular users should not be able to make a job active without requesting permission)

    Promise.all(
      selectedJobs.map((jobId) =>
        pb
          .collection("jobs")
          .update(jobId, {
            status: selectedStatus,
          })
          .then((res) => res)
      )
    ).then((res) => {
      closeChangeStatus();
      setSelectable(false);
      setSelectedJobs([]);
    });
  }

  return (
    <Stack px={160} w="100%" py="xl" align="center">
      <Modal
        opened={opened}
        onClose={close}
        title="Select a template to continue"
        size="xl"
        // transitionProps={{ transition: "fade", duration: 200 }}
      >
        <Stack justify="space-between" h="100%" align="flex-start">
          <Stack spacing="xs" w="100%">
            {templates &&
              templates.map((template) => (
                <Card
                  withBorder
                  padding="md"
                  radius="md"
                  w="100%"
                  key={template.id}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedTemplate === template.id
                        ? theme.colors.gray[1]
                        : "transparent",
                  }}
                  // set selected
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <Center>
                    <Text>{template.templateName}</Text>
                  </Center>
                </Card>
              ))}
          </Stack>
          <Button
            size="md"
            color="blue.9"
            radius="md"
            onClick={handleContinueFromTemplate}
          >
            Continue to job creation
          </Button>
        </Stack>
      </Modal>
      <Modal
        opened={openedDelete}
        onClose={closeDelete}
        title={`Delete ${selectedJobs.length} jobs`}
      >
        <Stack align="flex-start" justify="flex-start">
          <Text>
            Are you sure you want to delete {selectedJobs.length} jobs?
          </Text>
          <Button
            size="md"
            radius="md"
            color="blue.9"
            style={{
              alignSelf: "flex-end",
            }}
            onClick={handleDeleteJobs}
          >
            Delete jobs
          </Button>
        </Stack>
      </Modal>
      <Modal
        opened={openedChangeStatus}
        onClose={closeChangeStatus}
        title={`Change the status of ${selectedJobs.length} jobs`}
      >
        <Stack align="flex-start" justify="flex-start">
          <Text>
            Are you sure you want to change the status of {selectedJobs.length}{" "}
            jobs?
          </Text>
          <Button
            size="md"
            radius="md"
            color="blue.9"
            style={{
              alignSelf: "flex-end",
            }}
            onClick={handleChangeJobStatus}
          >
            Change jobs status
          </Button>
        </Stack>
      </Modal>
      <Grid justify="space-between" align="center" w="100%" gutter={0}>
        <Grid.Col span="auto" pr="sm">
          <TextInput
            size="md"
            radius="md"
            placeholder="search by name, description, etc..."
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col span="content">
          {/* <Indicator inline label="3" size={16}> */}
          <ActionIcon
            size="xl"
            radius="md"
            variant="light"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? (
              <IconAdjustmentsFilled size="1.125rem" />
            ) : (
              <IconAdjustmentsAlt size="1.125rem" />
            )}
          </ActionIcon>
          {/* </Indicator> */}
        </Grid.Col>
      </Grid>
      {showFilters && (
        <Facets
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          createdByFilter={createdByFilter}
          setCreatedByFilter={setCreatedByFilter}
          templateFilter={templateFilter}
          setTemplateFilter={setTemplateFilter}
        />
      )}
      <Group position={selectable ? "apart" : "left"} w="100%">
        <Group spacing="xs">
          <SplitButton open={handleOpenTemplatesModal} />
          <Button
            leftIcon={<IconSelect size="1rem" />}
            onClick={handleSetSelectable}
            size="md"
            radius="md"
            color="blue.9"
          >
            {selectable ? "Deselect job/s" : "Select job/s"}
          </Button>
          <ButtonMenu
            actionsEnabled={actionsEnabled}
            setSelectedStatus={setSelectedStatus}
            openChangeStatus={openChangeStatus}
          />

          <Button
            leftIcon={<IconTrash size="1rem" />}
            disabled={!actionsEnabled}
            onClick={openDelete}
            size="md"
            radius="md"
            color="blue.9"
          >
            Delete job/s
          </Button>
        </Group>
        {selectable && (
          <Checkbox label="Select all" onClick={handleSelectAll} />
        )}
      </Group>
      {/* <Button onClick={handleAdd50Jobs}>Add 50 jobs</Button> */}
      {/* this text should be left aligned */}
      {selectedJobs.length > 0 && (
        <Text
          style={{
            alignSelf: "flex-start",
          }}
        >
          {selectedJobs.length} job{selectedJobs.length > 1 ? "s" : ""} selected
        </Text>
      )}
      {jobs.map((job) => (
        <JobRow
          key={job.id}
          job={job}
          selectable={selectable}
          selectedJobs={selectedJobs}
          setSelectedJobs={setSelectedJobs}
        />
      ))}
      <Pagination total={totalPages} value={page} onChange={setPage} />
    </Stack>
  );
}

function SplitButton({ open }) {
  const navigate = useNavigate();
  const { classes } = useStyles();

  return (
    <Group noWrap spacing={0}>
      <Button
        className={classes.button}
        onClick={() => navigate("/instructor/newjob")}
        size="md"
        radius="md"
        color="blue.9"
      >
        New job
      </Button>
      <Menu
        transitionProps={{ transition: "pop" }}
        position="bottom-end"
        withinPortal
      >
        <Menu.Target>
          <ActionIcon
            variant="filled"
            color="blue.9"
            size={42}
            radius="md"
            className={classes.menuControl}
          >
            <IconChevronDown size="1rem" stroke={1.5} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            icon={<IconBriefcase size="1rem" stroke={1.5} />}
            onClick={() => navigate("/instructor/newjob")}
          >
            New job from scratch
          </Menu.Item>

          <Menu.Item
            icon={<IconTemplate size="1rem" stroke={1.5} />}
            onClick={open}
          >
            New job from template
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}

// New job dropdown button should be -> New empty job, New job from template
// on Templates page, we show a list of templates and have a button to create a new template
export function ButtonMenu({
  actionsEnabled,
  setSelectedStatus,
  openChangeStatus,
}) {
  const pb = useContext(PocketbaseContext);
  let user = pb.authStore.model;
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
          disabled={!actionsEnabled}
          size="md"
          color="blue.9"
          radius="md"
        >
          Change job status
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => {
            setSelectedStatus("closed");
            openChangeStatus();
          }}
        >
          Closed
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setSelectedStatus("draft");
            openChangeStatus();
          }}
        >
          Draft
        </Menu.Item>
        {user.isAdmin && (
          <Menu.Item
            onClick={() => {
              setSelectedStatus("active");
              openChangeStatus();
            }}
          >
            Active
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
