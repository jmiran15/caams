// send back to profile if not filled out (onboarded)

import { Outlet, useNavigate } from "react-router-dom";
import { Anchor, Center, Text } from "@mantine/core";
import { useContext } from "react";
import { PocketbaseContext } from "../context/PocketbaseContext";

export default function OnboardingProtected() {
  const pb = useContext(PocketbaseContext);
  let user = pb.authStore.model;
  let onboarded = user.onboarded;
  const navigate = useNavigate();
  let height = window.innerHeight;
  let centerHeight = height - 60;

  return onboarded ? (
    <Outlet />
  ) : (
    <Center w="100vw" h={centerHeight}>
      <Text size="lg">
        Please complete the required fields in your{" "}
        <Anchor onClick={() => navigate("/student/profile/personal")}>
          profile
        </Anchor>{" "}
        to continue
      </Text>
    </Center>
  );
}
