import { Tabs, Text, Card, useMantineTheme, Grid } from "@mantine/core";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PocketbaseContext } from "../../../context/PocketbaseContext";
import useSmallerThanSm from "../../../hooks/useSmallerThanSm";

const Profile = () => {
  const pb = useContext(PocketbaseContext);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/profile/")[1];
  let user = pb.authStore.model;
  let publicpath = `public-view/${user.id}`;
  const theme = useMantineTheme();

  const smallerThanSm = useSmallerThanSm();

  return (
    <Grid m={0} px={smallerThanSm ? "xl" : 160}>
      <Grid.Col span={smallerThanSm ? 12 : "content"}>
        <Tabs
          color="blue.9"
          variant="pills"
          orientation="vertical"
          value={path}
          onTabChange={(value) => navigate(`${value}`)}
        >
          <Tabs.List w="100%">
            <Card withBorder padding="md" radius="md">
              <Text mb="0.1rem">My Profile</Text>
              <Tabs.Tab value="personal" w="100%">
                Personal Info
              </Tabs.Tab>
              <Tabs.Tab value="experience" w="100%">
                Experience
              </Tabs.Tab>
              <Tabs.Tab value="education" w="100%">
                Education
              </Tabs.Tab>
              <Tabs.Tab value="skills" w="100%">
                Skills
              </Tabs.Tab>
              <Tabs.Tab value={publicpath} w="100%">
                Public view
              </Tabs.Tab>
            </Card>
          </Tabs.List>
        </Tabs>
      </Grid.Col>

      <Grid.Col span={smallerThanSm ? 12 : "auto"}>
        <Outlet />
      </Grid.Col>
    </Grid>
  );
};

export default Profile;
