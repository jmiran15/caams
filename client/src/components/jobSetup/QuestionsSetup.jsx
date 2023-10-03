import {
  Button,
  Card,
  Stack,
  Text,
  Group,
  Center,
  ScrollArea,
} from "@mantine/core";
import { useContext, useState } from "react";
import { Modal } from "../question/Modal";
import { useDisclosure } from "@mantine/hooks";
import Question from "../question/Question";
import { IconPlus } from "@tabler/icons-react";
import { StatusContext } from "../../context/JobStatusContext";

export default function QuestionsSetup({ questions, setQuestions }) {
  const [opened, handlers] = useDisclosure();
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const status = useContext(StatusContext);

  function handleAdd() {
    setSelectedQuestion(null);
    handlers.open();
  }

  return (
    <>
      <Modal
        opened={opened}
        close={handlers.close}
        title="Add or modify a question"
        setQuestions={setQuestions}
        questions={questions}
        selectedQuestion={selectedQuestion}
        setSelectedQuestion={setSelectedQuestion}
      />
      <Stack pb={80}>
        <Button
          style={{
            alignSelf: "flex-end",
          }}
          size="md"
          radius="md"
          color="blue.9"
          onClick={handleAdd}
          disabled={status?.status ? status.status !== "draft" : false}
        >
          <Group position="apart">
            <IconPlus />
            <Text>Add a question</Text>
          </Group>
        </Button>
        {questions.length === 0 && (
          <Card withBorder radius="md" padding="md">
            <Center>
              <Text>No questions yet</Text>
            </Center>
          </Card>
        )}
        {questions.map((question) => (
          <Card
            key={question.label}
            radius="md"
            padding="md"
            withBorder
            style={{
              cursor: "pointer",
            }}
            onClick={
              status?.status
                ? status.status !== "draft"
                  ? () => {}
                  : () => {
                      setSelectedQuestion(question);
                      handlers.open();
                    }
                : () => {
                    setSelectedQuestion(question);
                    handlers.open();
                  }
            }
          >
            <Question {...question} />
          </Card>
        ))}
      </Stack>
    </>
  );
}
