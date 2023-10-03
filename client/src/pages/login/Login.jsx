import { useNavigate } from "react-router-dom";
import { useViewportSize } from "@mantine/hooks";
import { useForm, zodResolver } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Container,
  Center,
  Stack,
  Space,
  Anchor,
  Card,
} from "@mantine/core";
import { z } from "zod";
import Header from "../../components/header/Header";
import { useContext, useEffect } from "react";
import { PocketbaseContext } from "../../context/PocketbaseContext";
import { GoogleIcon } from "./GoogleIcon";

const schema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

function Login(props) {
  const pb = useContext(PocketbaseContext);
  const navigate = useNavigate();
  const { height } = useViewportSize();
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    // log the user out
    pb.authStore.clear();
  }, [pb.authStore]);

  const isEmployer = (user) => user.role === "employer";

  const signInWithEmailAndPassword = async (email, password) => {
    let user;
    try {
      user = await pb.collection("user").authWithPassword(email, password);
    } catch (error) {
      console.log("error in sign in: ", error);
    } finally {
      console.log("user: ", user);
      if (isEmployer(user.record)) {
        navigate("/instructor/jobs");
      } else {
        if (user.record.onboarded) {
          navigate("/student/jobs");
        } else {
          navigate("/student/profile/personal");
        }
      }
    }
  };

  const ssoSignIn = async () => {
    let user;
    try {
      const result = await pb.collection("user").listAuthMethods();
      user = await pb.collection("user").authWithOAuth2({ provider: "google" });
    } catch (error) {
      console.log("error in sign in: ", error);
    } finally {
      if (user.record.role == "") {
        navigate("/sso-signup");
        return;
      }

      console.log("user in finally: ", user);
      if (isEmployer(user.record)) {
        navigate("/instructor/jobs");
      } else {
        if (user.record.onboarded) {
          navigate("/student/jobs");
        } else {
          navigate("/student/profile/personal");
        }
      }
    }
  };

  // if (isAuthenticated()) {
  //   debug("Redirect to home...");
  //   return <Navigate to="/" replace={true} />;
  // }

  return (
    <>
      <Header />
      <Center h="100%" p="xl">
        <Card radius="md" padding="xl" withBorder bg="gray.0">
          <Stack>
            <Text size="lg" weight={500}>
              Welcome to CAAMS
            </Text>
            <Button
              leftIcon={<GoogleIcon />}
              variant="default"
              color="gray"
              onClick={ssoSignIn}
              size="md"
              radius="md"
            >
              Sign in with Google
            </Button>

            <form
              onSubmit={form.onSubmit((values) =>
                signInWithEmailAndPassword(values.email, values.password)
              )}
            >
              <Stack spacing="xs">
                <TextInput
                  required
                  label="Email"
                  placeholder="your email"
                  {...form.getInputProps("email")}
                />

                <PasswordInput
                  required
                  label="Password"
                  placeholder="Your password"
                  autoComplete="new-password"
                  {...form.getInputProps("password")}
                />

                <Group position="apart" spacing="xs">
                  <Text size="xs">
                    Don't have an account?{" "}
                    <Anchor
                      component="button"
                      type="button"
                      onClick={() => navigate("/signup")}
                    >
                      Sign up
                    </Anchor>
                  </Text>
                  <Button size="md" color="blue.9" radius="md" type="submit">
                    Login
                  </Button>
                </Group>
              </Stack>
            </form>
          </Stack>
        </Card>
      </Center>
    </>
  );
}

export default Login;
