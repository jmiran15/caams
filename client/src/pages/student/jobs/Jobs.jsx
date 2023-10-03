import {
  Stack,
  Grid,
  Pagination,
  TextInput,
  Card,
  ActionIcon,
  Center,
  Text,
  NativeSelect,
  Group,
  useMantineTheme,
  Modal,
} from "@mantine/core";
import useSmallerThanSm from "../../../hooks/useSmallerThanSm";
import { useContext, useEffect, useState } from "react";
import { IconAdjustmentsFilled, IconAdjustmentsAlt } from "@tabler/icons-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { StickyContainer, Sticky } from "react-sticky";
import JobRow from "../../../components/ClientJobRow";
import Facets from "../../../components/jobsFacets/Facets";
import { PocketbaseContext } from "../../../context/PocketbaseContext";
import ApplicationModal from "../../../components/ApplicationModal";
import ActionBar from "../../../components/ActionBar";
import Body from "../../../components/Body";

export default function Jobs() {
  const pb = useContext(PocketbaseContext);

  const user = pb.authStore.model;
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");
  const [debounced] = useDebouncedValue(query, 200);
  const [showFilters, setShowFilters] = useState(false);
  const [opened, Modalhandlers] = useDisclosure(false);
  const [fullscreen, { open: openFullscreen, close: closeFullscreen }] =
    useDisclosure(false, {
      // onClose: () => setJob(null),
    });
  const location = useLocation();
  const [allSaved, setAllSaved] = useState("all");
  let isJobSelected = location.pathname.split("/").pop() !== "jobs"; // we have an id as last part of path
  const [masterSpan, setMasterSpan] = useState(5);
  let detailSpan = 12 - masterSpan;
  const theme = useMantineTheme();
  const [job, setJob] = useState(null);

  // managing the state of the filters
  const [category, setCategory] = useState([]); // engineering, research, other
  const [skills, setSkills] = useState([]); // java, cpp, c, docker, python, javascript, html, css, node.js, react, swift, kotlin, golang, sql, aws, azure, git, machine learning, tensorflow, data analysis
  const [experience, setExperience] = useState([]); // no experience, intermediate, senior level
  // const [location, setLocation] = useState([]); // remote, or specific location
  useEffect(() => {
    if (allSaved === "saved") {
      if (!jobs.length) {
        setMasterSpan(12);
      } else {
        setMasterSpan(5);
      }
    } else {
      setMasterSpan(5);
    }
  }, [jobs, allSaved]);

  let filterString = "";

  // Check if array is not empty, then join elements with "||"
  if (category.length)
    filterString +=
      "(" + category.map((c) => `category = "${c}"`).join(" || ") + ")";

  if (skills.length) {
    if (filterString.length) filterString += " && ";
    filterString +=
      "(" + skills.map((s) => `skills ~ "${s}"`).join(" || ") + ")";
  }

  if (experience.length) {
    if (filterString.length) filterString += " && ";
    filterString +=
      "(" + experience.map((e) => `experience = "${e}"`).join(" || ") + ")";
  }

  if (filterString.length) filterString += " && ";
  filterString += `status = "active"`;

  if (allSaved === "saved" && user.savedJobs.length) {
    if (filterString.length) filterString += " && ";
    filterString += `(${user.savedJobs
      .map((j) => `id = "${j}"`)
      .join(" || ")})`;
  }

  if (filterString.length) filterString += " && ";
  filterString += `(title ~ "${debounced}" || description ~ "${debounced}")`;

  useEffect(() => {
    // we can do this filtering as an API rule (i.e, fetch ONLY returns active jobs for students)

    if (allSaved === "saved" && !user.savedJobs.length) {
      setJobs([]);
      setTotalPages(1);
      return;
    }

    pb.collection("jobs")
      .getList(page, 10, {
        sort: "-created",
        filter: filterString,
      })
      .then(({ totalPages, totalItems, items }) => {
        setJobs(items);
        setTotalPages(totalPages);
      })
      .catch((err) => {
        console.log(err);
      });

    navigate("/student/jobs");
  }, [page, filterString, debounced, allSaved, user.savedJobs.length]);

  const smallerThanSm = useSmallerThanSm();

  return (
    <Stack px={smallerThanSm ? "xl" : 160} py="xl" spacing="xl">
      <Modal
        opened={opened}
        onClose={Modalhandlers.close}
        title="Application"
        fullScreen
        // transitionProps={{ transition: "fade", duration: 200 }}
      >
        {job && <ApplicationModal job={job} handlers={Modalhandlers} />}
      </Modal>
      <Modal
        opened={fullscreen}
        onClose={closeFullscreen}
        fullScreen
        withCloseButton={false}
        // transitionProps={{ transition: "fade", duration: 200 }}
      >
        {job && (
          <ActionBar
            key={job.id}
            selectedJob={job}
            close={closeFullscreen}
            fullscreen={fullscreen}
            closeFullscreen={closeFullscreen}
            handlers={Modalhandlers}
          />
        )}
        {job && job.description ? (
          <Body jobDescription={job.description} height={"50vh"} />
        ) : (
          <></>
        )}
      </Modal>
      <Stack>
        <Grid justify="space-between" align="center">
          <Grid.Col span="auto">
            <TextInput
              radius="md"
              size="md"
              placeholder="search by name, description, etc..."
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
            />
          </Grid.Col>
          <Grid.Col span="content">
            {/* <Indicator inline label="3" size={16}> */}
            <Group>
              <NativeSelect
                radius="md"
                size="md"
                placeholder="Sort by"
                data={["all", "saved"]}
                value={allSaved}
                onChange={(event) => setAllSaved(event.currentTarget.value)}
              />
              <ActionIcon
                radius="md"
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
            </Group>
            {/* </Indicator> */}
          </Grid.Col>
        </Grid>
        {showFilters && (
          <Facets
            category={category}
            setCategory={setCategory}
            skills={skills}
            setSkills={setSkills}
            experience={experience}
            setExperience={setExperience}
          />
        )}
      </Stack>

      {smallerThanSm ? (
        <Stack>
          {jobs.length ? (
            jobs.map((job) => (
              <JobRow
                key={job.id}
                job={job}
                setJob={setJob}
                openFullscreen={openFullscreen}
              />
            ))
          ) : (
            <Card radius="md" withBorder padding="xl">
              <Center>
                <Text>No jobs found.</Text>
              </Center>
            </Card>
          )}
        </Stack>
      ) : (
        <StickyContainer>
          <Grid w="100%" p={0} gutter={0}>
            <Grid.Col
              span={masterSpan}
              style={{
                paddingRight: theme.spacing.xl,
              }}
            >
              <Stack>
                {jobs.length ? (
                  jobs.map((job) => <JobRow key={job.id} job={job} />)
                ) : (
                  <Card radius="md" withBorder padding="xl">
                    <Center>
                      <Text>No jobs found.</Text>
                    </Center>
                  </Card>
                )}
              </Stack>
            </Grid.Col>
            <Grid.Col span={detailSpan}>
              <Sticky>
                {({ style }) => (
                  <div style={style}>
                    {jobs.length > 0 ? (
                      isJobSelected ? (
                        <Outlet />
                      ) : (
                        <Card radius="md" withBorder padding="xl">
                          <Center>
                            <Text>
                              Select a job to view more details and apply.
                            </Text>
                          </Center>
                        </Card>
                      )
                    ) : (
                      <></>
                    )}
                  </div>
                )}
              </Sticky>
            </Grid.Col>
          </Grid>
        </StickyContainer>
      )}
      <Center>
        <Pagination total={totalPages} value={page} onChange={setPage} />
      </Center>
    </Stack>
  );
}
