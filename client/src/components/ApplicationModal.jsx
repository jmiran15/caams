import { useContext, useEffect, useState } from "react";
import { Anchor, Button, Stack, Text, TextInput } from "@mantine/core";
import Question from "../components/question/Question";
import { PocketbaseContext } from "../context/PocketbaseContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
// import { SubmittedApplicationContext } from "../context/SubmittedApplicationContext";
// import Confetti from "react-dom-confetti";

// const config = {
//   angle: 90,
//   spread: 360,
//   startVelocity: 40,
//   elementCount: 70,
//   dragFriction: 0.12,
//   duration: 3000,
//   stagger: 3,
//   width: "10px",
//   height: "10px",
//   perspective: "500px",
//   colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
// };

export default function ApplicationModal({ job, handlers }) {
  const pb = useContext(PocketbaseContext);
  const [questions, setQuestions] = useState([]);
  const [jobStages, setJobStages] = useState([]);
  const [answers, setAnswers] = useState([]);
  const user = pb.authStore.model.id;
  const navigate = useNavigate();
  // const { submittedApplication, setSubmittedApplication } = useContext(
  //   SubmittedApplicationContext
  // );

  function fetchJobStages(jobId) {
    return pb
      .collection("stage")
      .getFullList({
        sort: "+position",
        filter: `job = "${jobId}"`,
      })
      .then((records) => records)
      .catch((error) => console.log("error fetching stages: ", error));
  }

  function fetchQ(jobId) {
    return pb
      .collection("jobQuestion")
      .getFullList({
        filter: `job = "${jobId}"`,
      })
      .then((questions) => {
        return Promise.all(
          questions.map((question) => {
            return pb
              .collection("possibleAnswer")
              .getFullList({
                sort: "-position",
                filter: `question = "${question.id}"`,
                $cancelKey: question.id,
              })
              .then((answers) => {
                return {
                  id: question.id,
                  label: question.label,
                  description: question.description,
                  type: question.type,
                  required: question.required,
                  options: answers.map((record) => record.answer).join("\n"),
                };
              });
          })
        )
          .then((questionsWithAnswers) => {
            return questionsWithAnswers;
          })
          .catch((error) => console.log("error fetching answers: ", error));
      })
      .catch((error) => console.log("error fetching questions: ", error));
  }

  function createApplication(applicationData, answers) {
    return pb
      .collection("application")
      .create(applicationData)
      .then((records) => {
        return Promise.all(
          Object.keys(answers).map((question) => {
            return pb
              .collection("answer")
              .create(
                {
                  application: records.id,
                  question,
                  answer: Array.isArray(answers[question])
                    ? String(answers[question].join("\n"))
                    : String(answers[question]),
                },
                {
                  $cancelKey: question,
                }
              )
              .then((record) => record)
              .catch((error) => console.log("error creating answers: ", error));
          })
        )
          .then((applicationAnswers) => applicationAnswers)
          .catch((error) => {
            console.log("error creating answers: ", error);
          });
      })
      .catch((error) => console.log("error creating application: ", error));
  }

  useEffect(() => {
    Promise.all([fetchJobStages(job.id), fetchQ(job.id)]).then(
      ([jobStages, questionsWithAnswers]) => {
        setJobStages(jobStages);
        setQuestions(questionsWithAnswers);
        setAnswers(
          questionsWithAnswers.map((question) => ({ question, answer: "" }))
        );
      }
    );
  }, [job.id]);

  console.log("the selected job inside the modal application: ", job);

  function handleSubmit(answers) {
    createApplication(
      {
        status: "submitted",
        user,
        stage: jobStages[0].id,
      },
      answers
    )
      .then(() => {
        // SHOW NOTIFICATION
        // SEND CONFIRMATION EMAIL
        // setSubmittedApplication(true);
        handlers.close();
      })
      .catch((error) => {
        console.log("error creating application: ", error);
      });
  }

  function setAnswer(questionId, answer) {
    setAnswers(
      answers.map((a) => {
        if (a.question.id === questionId) {
          return { ...a, answer };
        }
        return a;
      })
    );
  }

  let initialValues = questions.reduce((acc, question) => {
    return { ...acc, [question.id.replace(/^"|"$/g, "")]: "" };
  }, {});

  // lets generate an "application" form that is made dynamically from the "questions". Any question with "required: true" should have validation which doesn't allow the field to be empty. Also the name of the fields should be the question id
  const applicationForm = useForm({
    initialValues,
    validate: questions.reduce((acc, question) => {
      return {
        ...acc,
        [question.id.replace(/^"|"$/g, "")]: (value) => {
          if (question.required) {
            if (!value || (Array.isArray(value) && value.length === 0)) {
              return "This question is required";
            }
          }
          return null;
        },
      };
    }, {}),
  });

  return (
    <form onSubmit={applicationForm.onSubmit(handleSubmit)}>
      <Stack spacing="lg">
        {questions.length > 0 && answers.length > 0 ? (
          questions.map((question) => (
            <Question
              key={question.id}
              label={question.label}
              type={question.type}
              description={question.description}
              options={question.options}
              required={question.required}
              {...applicationForm.getInputProps(`${question.id}`)}
            />
          ))
        ) : (
          <Text>This job has no questions.</Text>
        )}
        <Text>
          Your{" "}
          <Anchor
            onClick={() => navigate(`/student/profile/public-view/${user}`)}
          >
            public profile
          </Anchor>{" "}
          will be submitted with this application.
        </Text>
        <Button
          color="blue.9"
          radius="md"
          size="md"
          type="submit"
          style={{
            alignSelf: "flex-end",
          }}
        >
          {/* <Confetti active={submittedApplication} config={config} style={{
            position: "absolute !important;
            top: 50%;
            left: 50%;
          }}/> */}
          Submit
        </Button>
      </Stack>
    </form>
  );
}
