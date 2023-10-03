import { Stack, Radio, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext } from "react";
import { PocketbaseContext } from "../../../../context/PocketbaseContext";

// removed email for now, requires verification to change (by regular users)
const PersonalInfo = () => {
  const pb = useContext(PocketbaseContext);
  let user = pb.authStore.model;

  const form = useForm({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      // email: user.email,
      linkedin: user.linkedin,
      visible: user.visible ? "show" : "hide",
      location: user.location,
    },

    validate: {
      firstName: (value) =>
        value.length < 1 ? "First name must have at least 1 letter" : null,
      lastName: (value) =>
        value.length < 1 ? "Last name must have at least 1 letter" : null,
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      location: (value) =>
        value.length < 1 ? "Location must have at least 1 letter" : null,
    },
  });

  function handleUpdateUser(values) {
    pb.collection("user")
      .update(user.id, {
        ...values,
        visible: values.visible === "show" ? true : false,
        onboarded: true,
      })
      .then((res) => {
        pb.collection("user")
          .authRefresh()
          .then((user) => {
            console.log("user refreshed: ", { user });
          });
      })
      .catch((err) => console.log({ err }));
  }

  return (
    <form
      onSubmit={form.onSubmit(handleUpdateUser)}
      style={{
        width: "100%",
      }}
    >
      <Stack w="100%" spacing="md">
        <Group position="flex-start" grow>
          <TextInput
            withAsterisk
            label="First name"
            placeholder="John"
            {...form.getInputProps("firstName")}
          />
          <TextInput
            withAsterisk
            label="Last name"
            placeholder="Doe"
            {...form.getInputProps("lastName")}
          />
        </Group>
        <TextInput
          label="LinkedIn profile url"
          {...form.getInputProps("linkedin")}
        />

        <Radio.Group
          label="What is your job search status?"
          {...form.getInputProps("visible")}
        >
          <Stack spacing="xs">
            <Radio value="show" label="I'm actively looking for a job" />
            <Radio
              value="hide"
              label="I'm not looking for a job. HIDE MY PROFILE."
            />
          </Stack>
        </Radio.Group>

        {/* implement Google Places API for location autofill */}
        <TextInput
          withAsterisk
          label="Location"
          {...form.getInputProps("location")}
        />
        <Button
          type="submit"
          size="md"
          color="blue.9"
          radius="md"
          style={{
            alignSelf: "flex-end",
          }}
        >
          Save
        </Button>
      </Stack>
    </form>
  );
};

export default PersonalInfo;
