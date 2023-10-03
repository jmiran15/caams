import { Stack, Textarea, Button, TextInput } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import {
  ADD_EXPERIENCE,
  UPDATE_EXPERIENCE,
} from "../reducers/experiencesReducer";
import { useForm } from "@mantine/form";
import { useContext } from "react";
import { PocketbaseContext } from "../context/PocketbaseContext";

export default function NewExperience({ dispatch, close, experience }) {
  const pb = useContext(PocketbaseContext);
  let user = pb.authStore.model;

  const experienceForm = useForm({
    initialValues: {
      title: experience ? experience.title : "",
      employer: experience ? experience.employer : "",
      location: experience ? experience.location : "",
      range: experience
        ? [new Date(experience.from), new Date(experience.to)]
        : ["", ""],
      summary: experience ? experience.summary : "",
    },

    validate: {
      title: (value) => (value.length > 0 ? null : "Title is required"),
      employer: (value) => (value.length > 0 ? null : "Employer is required"),
      location: (value) => (value.length > 0 ? null : "Location is required"),
      range: (value) =>
        value[0] && value[1] ? null : "Date range is required",
    },
  });

  // can generalize this function to education
  function handleSave(values) {
    if (experience) {
      pb.collection("experience")
        .update(experience.id, {
          ...values,
          from: values.range[0],
          to: values.range[1],
        })
        .then((experience) =>
          dispatch({
            type: UPDATE_EXPERIENCE,
            payload: {
              ...values,
              id: experience.id,
              from: values.range[0],
              to: values.range[1],
              user: user.id,
            },
          })
        )
        .catch((err) => console.log(err));
    } else {
      pb.collection("experience")
        .create({
          ...values,
          from: values.range[0],
          to: values.range[1],
          user: user.id,
        })
        .then((res) =>
          dispatch({
            type: ADD_EXPERIENCE,
            payload: res,
          })
        )
        .catch((err) => console.log(err));
    }
    close();
  }

  return (
    <form onSubmit={experienceForm.onSubmit(handleSave)}>
      <Stack
        spacing="md"
        style={{
          overflow: "visible",
        }}
      >
        <TextInput
          withAsterisk
          label="Employer Name"
          {...experienceForm.getInputProps("employer")}
        />
        <TextInput
          withAsterisk
          label="Title"
          {...experienceForm.getInputProps("title")}
        />
        <TextInput
          withAsterisk
          label="Location"
          {...experienceForm.getInputProps("location")}
        />
        <MonthPickerInput
          withAsterisk
          type="range"
          label="Select a date range"
          placeholder="From - To"
          clearable
          {...experienceForm.getInputProps("range")}
        />

        <Textarea
          placeholder="Summary (optional)"
          label="Summary"
          autosize
          minRows={3}
          {...experienceForm.getInputProps("summary")}
        />
        <Button
          type="submit"
          radius="md"
          size="md"
          color="blue.9"
          style={{
            alignSelf: "flex-end",
          }}
        >
          Save
        </Button>
      </Stack>
    </form>
  );
}
