import { Stack, Button, TextInput } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import {
  ADD_EXPERIENCE,
  UPDATE_EXPERIENCE,
} from "../reducers/experiencesReducer";
import { useForm } from "@mantine/form";
import EducationAutoComplete from "./EducationAutoComplete";
import { useContext } from "react";
import { PocketbaseContext } from "../context/PocketbaseContext";

export default function NewEducation({ dispatch, close, education }) {
  const pb = useContext(PocketbaseContext);
  let user = pb.authStore.model;

  const educationForm = useForm({
    initialValues: {
      school: education ? education.school : "",
      field: education ? education.field : "",
      range: education
        ? [new Date(education.from), new Date(education.to)]
        : ["", ""],
    },

    validate: {
      school: (value) => (value.length > 0 ? null : "School is required"),
      field: (value) => (value.length > 0 ? null : "Major is required"),
      range: (value) =>
        value[0] && value[1] ? null : "Date range is required",
    },
  });

  function handleSave(values) {
    if (education) {
      pb.collection("education")
        .update(education.id, {
          ...values,
          from: values.range[0],
          to: values.range[1],
        })
        .then((education) =>
          dispatch({
            type: UPDATE_EXPERIENCE,
            payload: {
              ...values,
              id: education.id,
              from: values.range[0],
              to: values.range[1],
              user: user.id,
            },
          })
        )
        .catch((err) => console.log(err));
    } else {
      pb.collection("education")
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
    <form onSubmit={educationForm.onSubmit(handleSave)}>
      <Stack spacing="md">
        <EducationAutoComplete
          form={educationForm}
          {...educationForm.getInputProps("school")}
        />
        <TextInput
          label="Major"
          withAsterisk
          {...educationForm.getInputProps("field")}
        />

        <MonthPickerInput
          type="range"
          label="Select a date range"
          placeholder="From - To"
          clearable
          withAsterisk
          {...educationForm.getInputProps("range")}
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
