import {
  Stack,
  Footer,
  Progress,
  Button,
  Text,
  Title,
  Group,
  Grid,
} from "@mantine/core";
import { useContext, useEffect, useRef, useState } from "react";
import { useListState } from "@mantine/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import General from "../../../components/jobSetup/General";
import TeamSetup from "../../../components/jobSetup/TeamSetup";
import ScorecardSetup from "../../../components/jobSetup/ScorecardSetup";
import PipelineSetup from "../../../components/jobSetup/PipelineSetup";
import DescriptionSetup from "../../../components/jobSetup/Description";
import QuestionsSetup from "../../../components/jobSetup/QuestionsSetup";
import ScopeSetup from "../../../components/jobSetup/ScopeSetup";
import LocationSetup from "../../../components/jobSetup/LocationSetup";
import useAdmin from "../../../hooks/useAdmin";
import useJob from "../../../hooks/useJob";
import { PocketbaseContext } from "../../../context/PocketbaseContext";

const sections = 8;
const values = generateValues(sections);

// TODO - add capability to delete questions
// TODO - add capability to remove a user from the team.
export default function NewJob() {
  const pb = useContext(PocketbaseContext);
  const navigate = useNavigate();
  const user = pb.authStore.model;
  const [searchParams] = useSearchParams();
  let from = searchParams.get("from"); // job id if from a template, o/w null
  const [active, setActive] = useState(1);
  const admin = useAdmin();

  console.log("the admin found: ", admin);
  const template = useJob(from);
  const job = useRef(null);

  async function fetchJobBasedCollection(collectionName, jobId, dataHandler) {
    const stages = await pb.collection(collectionName).getFullList({
      filter: `job = "${jobId}"`,
    });
    dataHandler.setState(stages);
  }

  useEffect(() => {
    if (template) {
      job.current = { ...template, id: null };
      setTitle(template.title);
      setSkills(template.skills);
      setCategory(template.category);
      setTeam(template.team);
      setDescription(template.description);
      setIsRemote(template.isRemote);
      setLocation(template.location);
      setExperience(template.experience);
      setPayMode(template.payMode);
      setPayFrom(template.payFrom);
      setPayTo(template.payTo);
      setBudget(template.budget);
      setCustomBudget(template.otherPay);
      fetchJobBasedCollection("scorecardItems", template.id, scorecardHandlers);
      fetchJobBasedCollection("stage", template.id, pipelineHandlers);
    }
  }, [template]);

  // getting qs, should move this to the question stage
  useEffect(() => {
    if (template) fetchQuestions(template.id);
  }, [template]);

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

  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState([]);
  const [category, setCategory] = useState("");
  const [team, setTeam] = useState([]);
  const [description, setDescription] = useState("");
  const [isRemote, setIsRemote] = useState(false);
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [payMode, setPayMode] = useState("hourly");
  const [payFrom, setPayFrom] = useState(0);
  const [payTo, setPayTo] = useState(0);
  const [budget, setBudget] = useState(0);
  const [customBudget, setCustomBudget] = useState("");
  const [scorecard, scorecardHandlers] = useListState(undefined);
  const [pipeline, pipelineHandlers] = useListState(undefined);
  const [questions, setQuestions] = useState([]);

  console.log("scorecard data: ", { scorecard });

  useEffect(() => {
    if (scorecard && scorecard.length === 0) {
      scorecardHandlers.setState([
        { label: "Communication", id: "1" },
        { label: "Experience", id: "2" },
      ]);
    }
    if (pipeline && pipeline.length === 0) {
      pipelineHandlers.setState([
        { label: "Application Review", id: "1" },
        { label: "Interview", id: "2" },
        { label: "Offer", id: "3" },
      ]);
    }
  }, [pipeline, scorecard]);

  function handleBack() {
    switch (active) {
      case 1:
        navigate("/instructor/jobs");
        break;
      default:
        setActive((active) => active - 1);
        break;
    }
  }

  function handleNext() {
    switch (active) {
      case 1: {
        if (!job.current || (job.current && !job.current.id)) {
          // we don't have job created yet
          let team = () => {
            if (user.isAdmin) {
              if (template) {
                // make sure the user is never included in their team
                return template.team.filter((member) => member !== user.id);
              } else {
                return [];
              }
            } else if (template) {
              if (!template.team.includes(admin.id)) {
                return [...template.team, admin.id].filter(
                  (member) => member !== user.id
                );
              } else {
                return template.team.filter((member) => member !== user.id);
              }
            } else {
              return [admin.id];
            }
          };

          pb.collection("jobs")
            .create(
              {
                title,
                category,
                skills,
                status: "draft",
                team: team(),
                createdBy: user.id,
                templateUsed: from ? from : null,
              },
              {
                expand: "team",
              }
            )
            .then((record) => {
              job.current = record;
              setTeam(record.expand.team ? record.expand.team : []);
              setActive((active) => active + 1);
            })
            .catch((err) => console.log("error creating job: ", err));
        } else {
          // update the job
          pb.collection("jobs")
            .update(job.current.id, {
              title,
              category,
              skills,
            })
            .then((record) => {
              job.current = record;
              setActive((active) => active + 1);
              console.log("updated job: ", { record });
            })
            .catch((err) => console.log("error updating job: ", err));
        }
        break;
      }
      case 2: {
        pb.collection("jobs")
          .update(job.current.id, {
            team: team.map((member) => member.id),
          })
          .then((record) => {
            job.current = record;
            setActive((active) => active + 1);
          })
          .catch((err) => console.log("error updating job team: ", err));
        break;
      }
      case 3: {
        updateJobBasedCollection(
          "scorecardItems",
          scorecard.map((score, idx) => ({
            label: score.label,
            position: idx + 1,
            job: job.current.id,
          })),
          job.current.id,
          pb
        ).then(() => {
          setActive((active) => active + 1);
        });
        break;
      }
      case 4: {
        updateJobBasedCollection(
          "stage",
          pipeline.map((item, idx) => ({
            label: item.label,
            position: idx + 1,
            job: job.current.id,
          })),
          job.current.id,
          pb
        )
          .then(() => {
            setActive((active) => active + 1);
          })
          .catch((err) => console.log("error saving pipeline items: ", err));
        break;
      }
      case 5: {
        // if (!description) return;
        pb.collection("jobs")
          .update(job.current.id, {
            description,
          })
          .then((record) => {
            job.current = record;
            setActive((active) => active + 1);
          })
          .catch((err) => console.log("error updating description: ", err));
        break;
      }
      case 6: {
        let q = questions.map((question, idx) => ({
          question: {
            job: job.current.id,
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

        updateJobQuestions(job.current.id, q, pb)
          .then(() => {
            setActive((active) => active + 1);
          })
          .catch((err) =>
            console.log("error updating job application questions: ", err)
          );
        break;
      }
      case 7: {
        pb.collection("jobs")
          .update(job.current.id, {
            isRemote,
            location: location,
          })
          .then((record) => {
            job.current = record;
            setActive((active) => active + 1);
          })
          .catch((err) => console.log("error updating job: ", err));
        break;
      }
      case 8: {
        pb.collection("jobs")
          .update(job.current.id, {
            experience,
            payMode,
            payFrom,
            payTo,
            budget,
            otherPay: customBudget,
          })
          .then((record) => {
            job.current = record;
            navigate("/instructor/jobs");
          })
          .catch((err) => console.log("error updating job: ", err));
        break;
      }
      default: {
        navigate("/instructor/jobs");
        break;
      }
    }
  }

  return (
    <Stack mx={160} my="xl">
      {active === 1 && (
        <StageWrapper
          number={1}
          title="Let's start with a strong title."
          description="This helps your job post stand out to the right candidates.
      It’s the first thing they’ll see, so make it count!"
        >
          <General
            title={title}
            setTitle={setTitle}
            skills={skills}
            setSkills={setSkills}
            category={category}
            setCategory={setCategory}
          />
        </StageWrapper>
      )}
      {active === 2 && (
        <StageWrapper
          number={2}
          title="Add members to your job team."
          description="Team members will be able to view and edit this job post."
        >
          <TeamSetup team={team} setTeam={setTeam} />
        </StageWrapper>
      )}
      {active === 3 && (
        <StageWrapper
          number={3}
          title="Create your scorecard."
          description="Your scorecard will be used as a template for scoring applicants."
        >
          <ScorecardSetup
            data={scorecard}
            dataHandlers={scorecardHandlers}
            title={"Create your scorecard"}
            status="draft"
          />
        </StageWrapper>
      )}
      {active === 4 && (
        <StageWrapper
          number={4}
          title="Create your pipeline."
          description="Your pipeline will be used to organize the recruiting and hiring process."
        >
          <PipelineSetup
            data={pipeline}
            dataHandlers={pipelineHandlers}
            title={"Create your pipeline"}
            status="draft"
          />
        </StageWrapper>
      )}
      {active === 5 && (
        <StageWrapper
          number={5}
          title="Describe what you are looking for."
          description="This is your chance to tell candidates about the role."
        >
          <DescriptionSetup
            description={description}
            setDescription={setDescription}
            status="draft"
          />
        </StageWrapper>
      )}
      {active === 6 && (
        <StageWrapper
          number={6}
          title="Screening questions (optional)."
          description="Narrow down your candidate pool by asking a few questions."
        >
          <QuestionsSetup
            questions={questions}
            setQuestions={setQuestions}
            status="draft"
          />
        </StageWrapper>
      )}
      {active === 7 && (
        <StageWrapper
          number={7}
          title="Location."
          description="Select where hires will work."
        >
          <LocationSetup
            isRemote={isRemote}
            setIsRemote={setIsRemote}
            location={location}
            setLocation={setLocation}
          />
        </StageWrapper>
      )}
      {active === 8 && (
        <StageWrapper
          number={8}
          title="Scope."
          description="Select the budget and experience level for this job posting."
        >
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
        </StageWrapper>
      )}
      <Controls
        active={active}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </Stack>
  );
}

function generateValues(numSections) {
  if (numSections <= 0) {
    throw new Error("Number of sections must be greater than 0.");
  }

  const values = [];
  const sectionSize = 100 / numSections; // Adjust for the last value being 100

  for (let i = 0; i < numSections; i++) {
    const value = i * sectionSize;
    values.push(value);
  }

  values.push(100); // Add 100 as the last value

  return values;
}

function StageWrapper({ number, title, description, children }) {
  return (
    <Grid gutter="xl">
      <Grid.Col span={6}>
        <Stack>
          <Text color="dimmed" size="xs">
            {number}/{sections} Job Post
          </Text>
          <Title order={1}>{title}</Title>
          <Text size="sm">{description}</Text>
        </Stack>
      </Grid.Col>
      <Grid.Col span={6}>{children}</Grid.Col>
    </Grid>
  );
}

export async function updateJobBasedCollection(
  collectionName,
  dataArray,
  jobId,
  pb
) {
  // delete all and create new
  await findAndDelete(collectionName, `job = "${jobId}"`, pb);
  await createMany(collectionName, dataArray, pb);
}

export async function updateJobQuestions(jobId, questions, pb) {
  pb.collection("jobQuestion")
    .getFullList({
      filter: `job = "${jobId}"`,
    })
    .then((records) => {
      Promise.all(
        records.map(
          async (record) => await deletePossibleAnswers(record.id, pb)
        )
      )
        .then(() => {
          Promise.all([
            ...records.map(async (record) => {
              await pb.collection(`jobQuestion`).delete(record.id);
            }),
            ...questions.map(async (data) => {
              await createQuestionAndPossibleAnswers(
                data.question,
                data.answers,
                pb
              );
            }),
          ])
            .then(() => console.log("done"))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log("error: ", err));
    })
    .catch((err) => console.log("error: ", err));
}

export const findAndDelete = async (collectionName, filter, pb) => {
  const records = await pb.collection(`${collectionName}`).getFullList({
    filter,
    $autoCancel: false,
  });

  await Promise.all(
    records.map(
      async (record) =>
        await pb.collection(`${collectionName}`).delete(record.id, {
          $autoCancel: false,
        })
    )
  );
};

export const createMany = async (collectionName, dataArray, pb) => {
  await Promise.all(
    dataArray.map((data, i) =>
      pb
        .collection(`${collectionName}`)
        .create(data, {
          $autoCancel: false,
        })
        .then((res) => console.log("res: ", { res }))
        .catch((err) => console.log("error: ", { err }))
    )
  );
};

export async function deletePossibleAnswers(questionId, pb) {
  await findAndDelete("possibleAnswer", `question = "${questionId}"`, pb);
}

export async function createQuestionAndPossibleAnswers(question, answers, pb) {
  const questionRecord = await pb.collection("jobQuestion").create(question, {
    $autoCancel: false,
  });

  if (answers) {
    const possibleAnswers = answers.map((answer) => ({
      question: questionRecord.id,
      ...answer,
    }));

    await createMany("possibleAnswer", possibleAnswers, pb);
  }
}

function Controls({ active, handleBack, handleNext }) {
  return (
    <Footer>
      <Progress value={values[active]} color="blue.9" size="sm" />
      <Group position="apart" mx={160} py="md">
        {active > 0 && (
          <Button
            size="md"
            radius="md"
            variant="default"
            // onClick={() => onClickBack()}
            onClick={handleBack}
          >
            Back
          </Button>
        )}
        <Button onClick={handleNext} color="blue.9" size="md" radius="md">
          Next
        </Button>
      </Group>
    </Footer>
  );
}
