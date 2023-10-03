import { useState, useEffect, useContext } from "react";
import { Stack } from "@mantine/core";
import Question from "./question/Question";
import { PocketbaseContext } from "../context/PocketbaseContext";

export default function Application({ applicationId }) {
  const pb = useContext(PocketbaseContext);
  const [questions, setQuestions] = useState(null);

  // create a "useApplication" hook that contains all this logic

  async function fetchApplication(applicationId) {
    return await pb.collection("application").getOne(applicationId, {
      expand: "stage",
    });
  }

  async function fetchJobQuestions(jobId) {
    return await pb.collection("jobQuestion").getFullList({
      filter: `job = "${jobId}"`,
    });
  }

  async function fetchQuestions(applicationId) {
    const application = await fetchApplication(applicationId);
    const jobQuestions = await fetchJobQuestions(application.expand.stage.job);

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
            filter: `question = "${jobQuestion.id}" && application = "${applicationId}"`,
            $autoCancel: false,
          }),
        ]);
      })
    ).then((values) =>
      setQuestions(
        jobQuestions.map((question, index) => {
          let answers = values[index][1];
          let possibleAnswers = values[index][0];

          return {
            id: question.id,
            label: question.label,
            description: question.description,
            type: question.type,
            required: question.required,
            options: possibleAnswers.map((record) => record.answer).join("\n"),
            value: answers.length
              ? question.type === "number"
                ? Number(answers[0].answer)
                : answers[0]?.answer
              : "",
          };
        })
      )
    );
  }

  useEffect(() => {
    fetchQuestions(applicationId);
  }, [applicationId]);

  return (
    <Stack spacing="lg">
      {questions &&
        questions.map((question) => (
          <Question key={question.id} {...question} d={true} />
        ))}
    </Stack>
  );
}
