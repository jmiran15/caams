import { Button, Card, Stack, Tabs, useMantineTheme } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import General from "../../../../components/jobSetup/General";
import TeamSetup from "../../../../components/jobSetup/TeamSetup";
import ScorecardSetup from "../../../../components/jobSetup/ScorecardSetup";
import PipelineSetup from "../../../../components/jobSetup/PipelineSetup";
import DescriptionSetup from "../../../../components/jobSetup/Description";
import QuestionsSetup from "../../../../components/jobSetup/QuestionsSetup";
import ScopeSetup from "../../../../components/jobSetup/ScopeSetup";
import LocationSetup from "../../../../components/jobSetup/LocationSetup";
import { patchJob, fetchJob } from "../../../../helpers/collections/jobs/api";
import { StatusContext } from "../../../../context/JobStatusContext";
import {
  updateJobBasedCollection,
  updateJobQuestions,
} from "../../newjob/NewJob";
import { PocketbaseContext } from "../../../../context/PocketbaseContext";

export default function JobSetup() {
  const pb = useContext(PocketbaseContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");
  const [status, setStatus] = useState(undefined);
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState([]);
  const [category, setCategory] = useState("");
  const [team, setTeam] = useState([]);
  const [description, setDescription] = useState(undefined);
  const [isRemote, setIsRemote] = useState(false);
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [payMode, setPayMode] = useState("hourly");
  const [payFrom, setPayFrom] = useState(0);
  const [payTo, setPayTo] = useState(0);
  const [budget, setBudget] = useState(0);
  const [customBudget, setCustomBudget] = useState("");
  const [scorecard, scorecardHandlers] = useListState([]);
  const [pipeline, pipelineHandlers] = useListState([]);
  const [questions, setQuestions] = useState([]);

  async function fetchJobBasedCollection(collectionName, jobId, dataHandler) {
    const stages = await pb.collection(collectionName).getFullList({
      filter: `job = "${jobId}"`,
    });
    dataHandler.setState(stages);
  }

  useEffect(() => {
    if (id) {
      fetchJob(pb, id, {
        expand: "team,createdBy",
      }).then((job) => {
        setTitle(job.title);
        setSkills(job.skills);
        setStatus(job.status);
        setCategory(job.category);
        setTeam(job.expand.team ? job.expand.team : []);
        setDescription(job.description);
        setIsRemote(job.isRemote);
        setLocation(job.location);
        setExperience(job.experience);
        setPayMode(job.payMode);
        setPayFrom(job.payFrom);
        setPayTo(job.payTo);
        setBudget(job.budget);
        setCustomBudget(job.otherPay);
      });

      fetchJobBasedCollection("scorecardItems", id, scorecardHandlers);
      fetchJobBasedCollection("stage", id, pipelineHandlers);
    }
  }, [id]);

  // getting qs
  useEffect(() => {
    fetchQuestions(id);
  }, [id]);

  async function fetchJobQuestions(jobId) {
    return await pb.collection("jobQuestion").getFullList({
      filter: `job = "${jobId}"`,
    });
  }

  async function fetchQuestions(jobId) {
    const jobQuestions = await fetchJobQuestions(jobId);

    await Promise.all(
      jobQuestions.map(async (jobQuestion) => {
        return Promise.all([
          await pb.collection("possibleAnswer").getFullList({
            sort: "-position",
            filter: `question = "${jobQuestion.id}"`,
            $cancelKey: jobQuestion.id,
            $autoCancel: false,
          }),
          await pb.collection("answer").getFullList({
            filter: `question = "${jobQuestion.id}"`,
            $autoCancel: false,
          }),
        ]);
      })
    ).then((values) =>
      setQuestions(
        jobQuestions.map((question, index) => {
          let possibleAnswers = values[index][0];

          return {
            id: question.id,
            label: question.label,
            description: question.description,
            type: question.type,
            required: question.required,
            options: possibleAnswers.map((record) => record.answer).join("\n"),
          };
        })
      )
    );
  }

  async function saveJob() {
    switch (activeTab) {
      case "general":
        patchJob(pb, id, {
          title,
          skills,
          category,
        });
        break;
      case "team":
        patchJob(pb, id, {
          team: team.map((member) => member.id),
        });
        break;
      case "scorecard":
        await updateJobBasedCollection(
          "scorecardItems",
          scorecard.map((score, idx) => ({
            label: score.label,
            position: idx + 1,
            job: id,
          })),
          id,
          pb
        );
        break;
      case "pipeline":
        await updateJobBasedCollection(
          "stage",
          pipeline.map((item, idx) => ({
            label: item.label,
            position: idx + 1,
            job: id,
          })),
          id,
          pb
        );
        break;
      case "description":
        patchJob(pb, id, {
          description,
        });
        break;
      case "questions":
        let q = questions.map((question, idx) => ({
          question: {
            job: id,
            automated: false,
            type: question.type,
            label: question.label,
            position: idx + 1,
            required: question.required,
          },
          answers:
            question.options === ""
              ? null
              : question.options.split(`\n`).map((option, idx) => ({
                  answer: option,
                  position: idx + 1,
                })),
        }));
        await updateJobQuestions(id, q, pb);
        break;
      case "scope":
        patchJob(pb, id, {
          experience,
          payMode,
          payFrom,
          payTo,
          budget,
          otherPay: customBudget,
        });
        break;
      case "location":
        patchJob(pb, id, {
          isRemote,
          location: location,
        });
        break;
      default:
        break;
    }
  }

  const theme = useMantineTheme();

  return (
    <Tabs
      w="100vw"
      px={160}
      py="xl"
      variant="pills"
      color="blue.9"
      orientation="vertical"
      defaultValue="info"
      value={activeTab}
      onTabChange={setActiveTab}
    >
      <Tabs.List
        style={{
          paddingRight: theme.spacing.xl,
        }}
      >
        <Card withBorder padding="md" radius="md">
          <Tabs.Tab value="general" w="100%">
            General
          </Tabs.Tab>
          <Tabs.Tab value="team" w="100%">
            Team
          </Tabs.Tab>
          <Tabs.Tab value="scorecard" w="100%">
            Scorecard
          </Tabs.Tab>
          <Tabs.Tab value="pipeline" w="100%">
            Pipeline
          </Tabs.Tab>
          <Tabs.Tab value="description" w="100%">
            Description
          </Tabs.Tab>
          <Tabs.Tab value="questions" w="100%">
            Questions
          </Tabs.Tab>
          <Tabs.Tab value="scope" w="100%">
            Scope
          </Tabs.Tab>
          <Tabs.Tab value="location" w="100%">
            Location
          </Tabs.Tab>
          <Tabs.Tab value="manage" w="100%">
            Manage
          </Tabs.Tab>
        </Card>
      </Tabs.List>

      <StatusContext.Provider value={{ status }}>
        <Tabs.Panel value="general" px="xl">
          <General
            title={title}
            setTitle={setTitle}
            category={category}
            setCategory={setCategory}
            skills={skills}
            setSkills={setSkills}
          />
          <Button
            mt="xl"
            size="md"
            color="blue.9"
            radius="md"
            onClick={() => saveJob()}
            disabled={status ? status !== "draft" : false}
          >
            Save
          </Button>
        </Tabs.Panel>
        <Tabs.Panel value="team" px="xl">
          <TeamSetup team={team} setTeam={setTeam} />
          <Button
            mt="xl"
            onClick={() => saveJob()}
            size="md"
            color="blue.9"
            radius="md"
            disabled={status ? status !== "draft" : false}
          >
            Save
          </Button>
        </Tabs.Panel>
        <Tabs.Panel value="scorecard" px="xl">
          <ScorecardSetup
            data={scorecard}
            dataHandlers={scorecardHandlers}
            title={"Create your scorecard"}
          />
          <Button
            mt="xl"
            onClick={() => saveJob()}
            size="md"
            color="blue.9"
            radius="md"
            disabled={status ? status !== "draft" : false}
          >
            Save
          </Button>
        </Tabs.Panel>
        <Tabs.Panel value="pipeline" px="xl">
          <PipelineSetup
            data={pipeline}
            dataHandlers={pipelineHandlers}
            title={"Create your pipeline"}
          />
          <Button
            mt="xl"
            onClick={() => saveJob()}
            size="md"
            color="blue.9"
            radius="md"
            disabled={status ? status !== "draft" : false}
          >
            Save
          </Button>
        </Tabs.Panel>
        <Tabs.Panel value="description" px="xl">
          {description !== undefined && (
            <DescriptionSetup
              description={description}
              setDescription={setDescription}
            />
          )}

          <Button
            mt="xl"
            onClick={() => saveJob()}
            size="md"
            color="blue.9"
            radius="md"
            disabled={status ? status !== "draft" : false}
          >
            Save
          </Button>
        </Tabs.Panel>
        <Tabs.Panel value="questions" px="xl">
          <QuestionsSetup questions={questions} setQuestions={setQuestions} />
          <Button
            mt="xl"
            onClick={() => saveJob()}
            size="md"
            color="blue.9"
            radius="md"
            disabled={status ? status !== "draft" : false}
          >
            Save
          </Button>
        </Tabs.Panel>
        <Tabs.Panel value="scope" px="xl">
          <ScopeSetup
            experience={experience}
            setExperience={setExperience}
            payMode={payMode}
            setPayMode={setPayMode}
            payFrom={payFrom}
            setPayFrom={setPayFrom}
            payTo={payTo}
            setPayTo={setPayTo}
            budget={budget}
            setBudget={setBudget}
            customBudget={customBudget}
            setCustomBudget={setCustomBudget}
          />
          <Button
            mt="xl"
            onClick={() => saveJob()}
            size="md"
            color="blue.9"
            radius="md"
            disabled={status ? status !== "draft" : false}
          >
            Save
          </Button>
        </Tabs.Panel>
        <Tabs.Panel value="location" px="xl">
          <LocationSetup
            isRemote={isRemote}
            setIsRemote={setIsRemote}
            location={location}
            setLocation={setLocation}
          />
          <Button
            mt="xl"
            onClick={() => saveJob()}
            size="md"
            color="blue.9"
            radius="md"
            disabled={status ? status !== "draft" : false}
          >
            Save
          </Button>
        </Tabs.Panel>
        <Tabs.Panel value="manage" px="xl">
          <Stack>
            <Button
              size="md"
              radius="md"
              color="red"
              variant="light"
              onClick={() => {
                patchJob(pb, id, {
                  status: "closed",
                });
                navigate("/instructor/jobs");
              }}
            >
              Close job
            </Button>
            <Button
              size="md"
              radius="md"
              color="red.9"
              onClick={() => {
                patchJob(pb, id, {
                  isDeleted: true,
                });
                navigate("/instructor/jobs");
              }}
            >
              Delete job
            </Button>
          </Stack>
        </Tabs.Panel>
      </StatusContext.Provider>
    </Tabs>
  );
}

// import all of these functions
