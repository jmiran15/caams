// this is a template page

import {
  TextInput,
  Card,
  Tabs,
  useMantineTheme,
  Button,
  Modal,
  Center,
  Text,
  Stack,
} from "@mantine/core";
import { useListState, useDisclosure } from "@mantine/hooks";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  updateJobBasedCollection,
  updateJobQuestions,
} from "../../newjob/NewJob";
import General from "../../../../components/jobSetup/General";
import TeamSetup from "../../../../components/jobSetup/TeamSetup";
import Scorecard from "../../../../components/jobSetup/ScorecardSetup";
import PipelineSetup from "../../../../components/jobSetup/PipelineSetup";
import Description from "../../../../components/jobSetup/Description";
import QuestionsSetup from "../../../../components/jobSetup/QuestionsSetup";
import { patchJob, fetchJob } from "../../../../helpers/collections/jobs/api";
import ScopeSetup from "../../../../components/jobSetup/ScopeSetup";
import LocationSetup from "../../../../components/jobSetup/LocationSetup";
import { PocketbaseContext } from "../../../../context/PocketbaseContext";

// should we make job a context provider so that we dont have to prop drill?

const JobReview = () => {
  const pb = useContext(PocketbaseContext);
  const [activeTab, setActiveTab] = useState("name");
  const { templateid } = useParams();
  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);
  const navigate = useNavigate();
  const [templateName, setTemplateName] = useState("");
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

  // useEffect(() => {
  //   if (!user.isAdmin && user.admin) {
  //     pb.collection("user")
  //       .getOne(user.admin)
  //       .then((admin) => setAdmin(admin))
  //       .catch((err) => console.log("error getting admin: ", err));
  //   }
  // }, [user.admin, user.isAdmin]);

  function handleDeleteTemplate() {
    // set is deleted to true and navigate back to templates page
    pb.collection("jobs")
      .update(templateid, {
        isDeleted: true,
      })
      .then((res) => navigate("/instructor/templates"))
      .catch((err) => console.log(err));
  }

  async function fetchJobBasedCollection(collectionName, jobId, dataHandler) {
    const stages = await pb.collection(collectionName).getFullList({
      filter: `job = "${jobId}"`,
    });
    dataHandler.setState(stages);
  }

  // should do all the fetches at same time with promise.all
  useEffect(() => {
    if (templateid) {
      fetchJob(pb, templateid, {
        expand: "team,createdBy",
      }).then((job) => {
        setTemplateName(job.templateName);
        setTitle(job.title);
        setSkills(job.skills);
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

      fetchJobBasedCollection("scorecardItems", templateid, scorecardHandlers);
      fetchJobBasedCollection("stage", templateid, pipelineHandlers);
    }
  }, [templateid]);

  useEffect(() => {
    fetchQuestions(templateid);
  }, [templateid]);

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
      case "name":
        patchJob(pb, templateid, {
          templateName,
        });
        break;
      case "general":
        patchJob(pb, templateid, {
          title,
          skills,
          category,
        });
        break;
      case "team":
        patchJob(pb, templateid, {
          team: team.map((member) => member.id),
        });
        break;
      case "scorecard":
        await updateJobBasedCollection(
          "scorecardItems",
          scorecard.map((score, idx) => ({
            label: score.label,
            position: idx + 1,
            job: templateid,
          })),
          templateid,
          pb
        );
        break;
      case "pipeline":
        await updateJobBasedCollection(
          "stage",
          pipeline.map((item, idx) => ({
            label: item.label,
            position: idx + 1,
            job: templateid,
          })),
          templateid,
          pb
        );
        break;
      case "description":
        patchJob(pb, templateid, {
          description,
        });
        break;
      case "questions":
        let q = questions.map((question, idx) => ({
          question: {
            job: templateid,
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
        await updateJobQuestions(templateid, q, pb);
        break;
      case "scope":
        patchJob(pb, templateid, {
          experience,
          payMode,
          payFrom,
          payTo,
          budget,
          otherPay: customBudget,
        });
        break;
      case "location":
        patchJob(pb, templateid, {
          isRemote,
          location: location,
        });
        break;
      default:
        break;
    }
  }

  const theme = useMantineTheme();

  function SaveJobButton() {
    return (
      <Button
        mt="xl"
        size="md"
        color="blue.9"
        radius="md"
        onClick={() => saveJob()}
      >
        Save
      </Button>
    );
  }

  return (
    <Tabs
      color="blue.9"
      variant="pills"
      defaultValue="name"
      orientation="vertical"
      mx={160}
      my="xl"
      value={activeTab}
      onTabChange={setActiveTab}
    >
      <Tabs.List
        style={{
          paddingRight: theme.spacing.xl,
        }}
      >
        <Card withBorder padding="md" radius="md">
          <Tabs.Tab value="name" w="100%">
            Template name
          </Tabs.Tab>
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
      <Tabs.Panel value="name" pt="xs">
        <TextInput
          size="md"
          placeholder="Template name"
          label="Template name"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
        />
        <SaveJobButton />
      </Tabs.Panel>
      <Tabs.Panel value="general" pt="xs">
        <General
          title={title}
          setTitle={setTitle}
          skills={skills}
          setSkills={setSkills}
          category={category}
          setCategory={setCategory}
        />
        <SaveJobButton />
      </Tabs.Panel>
      <Tabs.Panel value="team" pt="xs">
        <TeamSetup team={team} setTeam={setTeam} />
        <SaveJobButton />
      </Tabs.Panel>
      <Tabs.Panel value="scorecard" pt="xs">
        <Scorecard
          data={scorecard}
          dataHandlers={scorecardHandlers}
          title={"Create your scorecard"}
        />
        <SaveJobButton />
      </Tabs.Panel>
      <Tabs.Panel value="pipeline" pt="xs">
        <PipelineSetup
          data={pipeline}
          dataHandlers={pipelineHandlers}
          title={"Create your pipeline"}
        />
        <SaveJobButton />
      </Tabs.Panel>
      <Tabs.Panel value="description" pt="xs">
        {description !== undefined && (
          <Description
            description={description}
            setDescription={setDescription}
          />
        )}
        <SaveJobButton />
      </Tabs.Panel>
      <Tabs.Panel value="questions" pt="xs">
        <QuestionsSetup questions={questions} setQuestions={setQuestions} />
        <SaveJobButton />
      </Tabs.Panel>
      <Tabs.Panel value="scope" pt="xs">
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
        <SaveJobButton />
      </Tabs.Panel>
      <Tabs.Panel value="location" pt="xs">
        <LocationSetup
          isRemote={isRemote}
          setIsRemote={setIsRemote}
          location={location}
          setLocation={setLocation}
        />
        <SaveJobButton />
      </Tabs.Panel>
      <Tabs.Panel value="manage" pt="xs">
        <Modal
          opened={openedDelete}
          onClose={closeDelete}
          title="Delete this template"
        >
          <Stack>
            <Center>
              <Text>Are you sure you want to delete this template?</Text>
            </Center>
            <Button
              color="blue.9"
              size="md"
              radius="md"
              onClick={handleDeleteTemplate}
            >
              <Text>Delete</Text>
            </Button>
          </Stack>
        </Modal>
        <Button color="blue.9" size="md" radius="md" onClick={openDelete}>
          Delete this template
        </Button>
      </Tabs.Panel>
    </Tabs>
  );
};

export default JobReview;
