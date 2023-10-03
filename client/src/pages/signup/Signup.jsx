import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import {
//   MicrosoftLoginButton,
//   GoogleLoginButton,
// } from "react-social-login-buttons";
// use auth buttons from ui.mantine.dev (Google, Microsoft)
import {
  TextInput,
  PasswordInput,
  Text,
  Group,
  Button,
  Center,
  Stack,
  Divider,
  Anchor,
  Card,
  Radio,
  px,
  useMantineTheme,
} from "@mantine/core";
import { useContext, useState } from "react";
import { useViewportSize } from "@mantine/hooks";
import { PocketbaseContext } from "../../context/PocketbaseContext";
import Header from "../../components/header/Header";
import { GoogleIcon } from "../login/GoogleIcon";
import { useForm } from "@mantine/form";

export default function Signup() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { height } = useViewportSize();
  let role = searchParams.get("role");
  let confirmationPage = location.pathname === "/signup/confirmation";

  return (
    <>
      <Header />
      <Center h="100%" p="xl">
        {role ? (
          <SignupForm role={role} />
        ) : confirmationPage ? (
          <Confirmation />
        ) : (
          <SelectRole />
        )}
      </Center>
    </>
  );
}

function Confirmation() {
  const navigate = useNavigate();
  const { height } = useViewportSize();
  const theme = useMantineTheme();

  return (
    <Center w="100vw" h={height - 60 - 2 * px(theme.spacing.xl)} px={160}>
      <Stack align="flex-start">
        <Text size="lg">
          Success! Your employer signup request has been sent and is awaiting
          approval. The site administrator will notify you via email once your
          request has been approved.
        </Text>
        <Button
          color="blue.9"
          size="md"
          radius="md"
          onClick={() => navigate("/login")}
        >
          Go back to login
        </Button>
      </Stack>
    </Center>
  );
}

function SelectRole() {
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  return (
    <Card radius="md" padding="xl" withBorder bg="gray.0">
      <Stack>
        <Text size="lg" weight={500}>
          Join as a user or employer
        </Text>
        <Radio.Group
          value={role}
          onChange={setRole}
          name="role"
          label="Select your role"
          withAsterisk
        >
          <Group>
            <Radio value="user" label="User" />
            <Radio value="employer" label="Employer" />
          </Group>
        </Radio.Group>
        <Group position="apart" spacing="xs">
          <Text size="xs" style={{ maxWidth: "15vw", minWidth: "160px" }}>
            Already have an account?{" "}
            <Anchor
              component="button"
              type="button"
              onClick={() => navigate("/login")}
            >
              Login
            </Anchor>
          </Text>
          <Button
            onClick={() => navigate("/signup?role=" + role)}
            color="blue.9"
            size="md"
            radius="md"
          >
            Continue
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}

function SignupForm({ role }) {
  const pb = useContext(PocketbaseContext);
  const navigate = useNavigate();

  const signupForm = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },

    validate: {
      firstName: (value) =>
        value.length > 0 ? null : "First name is required",
      lastName: (value) => (value.length > 0 ? null : "Last name is required"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 8 ? null : "Password must be 8 or more characters",
    },
  });

  function handleSignUp({ firstName, lastName, email, password }) {
    pb.collection("user")
      .create({
        firstName,
        lastName,
        email,
        password,
        passwordConfirm: password,
        role,
        emailVisibility: true,
      })
      .then((res) => {
        // authenticate the user
        pb.collection("user")
          .authWithPassword(email, password)
          .then((res) => {
            // navigate to the dashboard OR confirmation page if signed up as employer
            switch (role) {
              case "user":
                navigate("/student/profile/personal");
                break;
              case "employer":
                navigate("/signup/confirmation");
                break;
              default:
                break;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const isEmployer = (user) => user.role === "employer";

  const handleSSOSignUp = async () => {
    let user;
    try {
      await pb.collection("user").listAuthMethods();
      user = await pb.collection("user").authWithOAuth2({ provider: "google" });

      //update the user with the correct role
      const data = {
        role: role,
      };

      user = await pb
        .collection("user")
        .update(`${pb.authStore.model.id}`, data);
    } catch (error) {
      console.log("error in sign in: ", error);
    } finally {
      if (user.role == "") {
        navigate("/sso-signup");
        return;
      }

      if (isEmployer(user)) {
        navigate("/signup/confirmation");
      } else {
        if (user.onboarded) {
          navigate("/student/jobs");
        } else {
          navigate("/student/profile/personal");
        }
      }
    }
  };

  return (
    <Card radius="md" padding="xl" withBorder bg="gray.0">
      <form onSubmit={signupForm.onSubmit(handleSignUp)}>
        <Stack>
          <Text size="lg" weight={500}>
            Sign up as a {role}
          </Text>
          <Button
            leftIcon={<GoogleIcon />}
            variant="default"
            color="gray"
            onClick={handleSSOSignUp}
            size="md"
            radius="md"
          >
            Sign up with Google
          </Button>
          {/* <Button disabled>Sign up with Microsoft</Button> */}
          <Divider my="xs" label="or" labelPosition="center" />
          <Group>
            <TextInput
              label="First Name"
              placeholder="John"
              {...signupForm.getInputProps("firstName")}
              withAsterisk
            />
            <TextInput
              label="Last Name"
              placeholder="Doe"
              {...signupForm.getInputProps("lastName")}
              withAsterisk
            />
          </Group>
          <TextInput
            label="Email Address"
            {...signupForm.getInputProps("email")}
            withAsterisk
          />
          <PasswordInput
            label="Password"
            {...signupForm.getInputProps("password")}
            withAsterisk
          />

          <Group position="apart" spacing="xs">
            <Text size="xs" style={{ maxWidth: "15vw", minWidth: "160px" }}>
              Already have an account?{" "}
              <Anchor
                component="button"
                type="button"
                onClick={() => navigate("/login")}
              >
                Login
              </Anchor>
            </Text>
            <Button type="submit" color="blue.9" size="md" radius="md">
              Sign up
            </Button>
          </Group>
        </Stack>
      </form>
    </Card>
  );
}
