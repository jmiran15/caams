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
  Center,
  Stack,
  Divider,
  Anchor,
  Card,
  Radio,
  Flex,
} from "@mantine/core";
import { z } from "zod";
import Header from "../../components/header/Header";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

const pb = new PocketBase("http://10.203.70.207:8090");
// const pb = new PocketBase("https://caamsjhu.pockethost.io");

function SSOSignup(props) {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {}, []);

  const isEmployer = (user) => user.role === "employer";

  const handleContinue = async () => {
    let user;

    //set the users role
    const data = {
      role: role,
    };

    user = await pb.collection("user").update(`${pb.authStore.model.id}`, data);

    try {
      console.log("user: ", user);
    } catch (error) {
      console.log("error in sign in: ", error);
    } finally {
      if (isEmployer(user)) {
        navigate("/instructor/jobs");
      } else {
        if (user.onboarded) {
          navigate("/student/jobs");
        } else {
          navigate("/student/profile/personal");
        }
      }
    }
    navigate("/student/jobs");
  };

  // if (isAuthenticated()) {
  //   debug("Redirect to home...");
  //   return <Navigate to="/" replace={true} />;
  // }

  return (
    <>
      <Flex
        mih={50}
        gap="md"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
        sx={{ height: "100vh" }}
      >
        <Card padding="xl" radius="md" withBorder>
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
              <Stack>
                <Radio value="user" label="User" />
                <Radio value="employer" label="Employer" />
              </Stack>
            </Radio.Group>
            <Group position="apart" spacing="xs">
              <Text size="xs" style={{ maxWidth: "15vw", minWidth: "160px" }}>
                Already have an account?
                <Anchor component="button" type="button">
                  Login
                </Anchor>
              </Text>
              <Button
                onClick={() => {
                  handleContinue();
                }}
              >
                Continue
              </Button>
            </Group>
          </Stack>
        </Card>
      </Flex>
    </>
  );
}

export default SSOSignup;
