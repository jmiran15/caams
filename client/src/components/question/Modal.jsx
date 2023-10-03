import {
  Modal as MantineModal,
  NativeSelect,
  Stack,
  TextInput,
  Switch,
  Textarea,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

export const Modal = ({
  opened,
  close,
  title,
  selectedQuestion, // if clicked to edit
  setQuestions, // to add/update questions
  questions,
  setSelectedQuestion,
}) => {
  const questionForm = useForm({
    initialValues: {
      label: "",
      description: "",
      type: "shortText",
      options: "",
      required: false,
    },
    // validate values: label cannot be empty, type cannot be empty, options cannot have duplicate values (options is a string with \n as separator)
    validate: {
      label: (value) =>
        value.trim().length > 0 ? null : "Label cannot be empty",
      type: (value) =>
        value.trim().length > 0 ? null : "Type cannot be empty",
      options: (value) => {
        const options = value.split("\n").map((option) => option.trim());
        const uniqueOptions = [...new Set(options)];
        return options.length === uniqueOptions.length
          ? null
          : "Options cannot have duplicate values";
      },
    },
  });

  useEffect(() => {
    questionForm.setFieldValue(
      "label",
      selectedQuestion ? selectedQuestion.label : ""
    );
    questionForm.setFieldValue(
      "description",
      selectedQuestion ? selectedQuestion.description : ""
    );
    questionForm.setFieldValue(
      "type",
      selectedQuestion ? selectedQuestion.type : "shortText"
    );
    questionForm.setFieldValue(
      "options",
      selectedQuestion ? selectedQuestion.options : ""
    );
    questionForm.setFieldValue(
      "required",
      selectedQuestion ? selectedQuestion.required : false
    );
  }, [selectedQuestion]);

  const hasOptions = () =>
    questionForm.values.type === "checkbox" ||
    questionForm.values.type === "radio";

  // question:
  // {
  //   label: "", -> required
  //   description: "", -> optional
  //   type: "", -> required
  //   options: [], -> required if type is checkbox or radio
  //   required: false, -> optional
  // }
  function update(question) {
    const newQuestions = [...questions];
    if (selectedQuestion) {
      // update
      const index = newQuestions.findIndex(
        (q) => q.label === selectedQuestion.label
      );
      newQuestions[index] = question;
    } else {
      // add
      newQuestions.push(question);
    }
    setQuestions(newQuestions);
  }

  return (
    <MantineModal opened={opened} onClose={close} title={title}>
      <form
        onSubmit={questionForm.onSubmit(
          ({ label, description, type, options, required }) => {
            update({
              label,
              description,
              type,
              options: hasOptions() ? options : "",
              required,
            });
            questionForm.reset();
            close();
          }
        )}
      >
        <Stack>
          <NativeSelect
            withAsterisk
            label="Type"
            // value={type}
            // onChange={(event) => setType(event.currentTarget.value)}
            {...questionForm.getInputProps("type")}
            data={[
              { value: "shortText", label: "Short Text" },
              { value: "longText", label: "Long Text" },
              { value: "number", label: "Number" },
              { value: "checkbox", label: "Checkbox" },
              { value: "radio", label: "Radio" },
            ]}
          />
          <TextInput
            label="Label"
            // value={label}
            // onChange={(event) => setLabel(event.target.value)}
            withAsterisk
            {...questionForm.getInputProps("label")}
          />
          {/* <TextInput
          label="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        /> */}
          <Switch
            label="Required"
            // checked={required}
            // onChange={(event) => setRequired(event.currentTarget.checked)}
            {...questionForm.getInputProps("required")}
          />
          {(questionForm.values.type === "checkbox" ||
            questionForm.values.type === "radio") && (
            <Textarea
              label="Options"
              placeholder={`Your choices go here\nOne per line\nLike this`}
              // value={options}
              // onChange={(event) => setOptions(event.target.value)}
              autosize
              minRows={3}
              maxRows={4}
              withAsterisk
              {...questionForm.getInputProps("options")}
            />
          )}
          <Button
            color="blue.9"
            size="md"
            radius="md"
            type="submit"
            style={{
              alignSelf: "flex-end",
            }}
          >
            Save
          </Button>
        </Stack>
      </form>
    </MantineModal>
  );
};
