import {
  Header as MantineHeader,
  Group,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useUserLinks,
  employerLinks,
  studentProfileMenuItems,
  employerProfileMenuItems,
  adminProfileMenuItems,
} from "../../helpers/headerData";
import Logo from "./Logo";
import HeaderLinks from "./HeaderLinks";
import ProfileMenuBtn from "./ProfileMenuBtn";
import { InboxNotificationCountContext } from "../../context/InboxNotificationCountContext";
import { PocketbaseContext } from "../../context/PocketbaseContext";
import { useMediaQuery } from "@mantine/hooks";
import useSmallerThanSm from "../../hooks/useSmallerThanSm";

export default function Header({ opened, setOpened }) {
  const pb = useContext(PocketbaseContext);
  const navigate = useNavigate();
  const userLinks = useUserLinks();
  const { inboxNotifications } = useContext(InboxNotificationCountContext);
  const location = useLocation();
  const theme = useMantineTheme();
  const smallerThanSm = useSmallerThanSm();
  const smallerThanMd = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  function isUser() {
    return pb.authStore.model.role === "user";
  }

  function isAuthenticated() {
    return pb.authStore.model
      ? (pb.authStore.isValid && pb.authStore.model.role === "user") ||
          (pb.authStore.model.role === "employer" &&
            pb.authStore.model.reviewed === true)
      : false;
  }

  function isAdmin() {
    return pb.authStore.model.isAdmin;
  }

  const user = () => pb.authStore.model;

  async function logout() {
    await pb.authStore.clear();
  }

  function getFile(collection, fileName) {
    let file = null;
    try {
      file = pb.files.getUrl(collection, fileName);
      return file;
    } catch (error) {
      console.log("error fetching file", error);
    }
  }

  let userModel = user();
  let firstName,
    avatar = null;

  if (isAuthenticated()) {
    firstName = userModel.firstName;
    if (userModel.avatar !== "") avatar = getFile(userModel, userModel.avatar);
  }

  useEffect(() => {
    if (!isAuthenticated()) {
      logout();

      if (
        !location.pathname.includes("/signup") &&
        !location.pathname.includes("/login")
      ) {
        navigate("/login");
      }
    }
  }, []);

  const links = isAuthenticated() ? (isUser() ? userLinks : employerLinks) : [];
  return (
    <MantineHeader height={70} bg="blue.1" px={smallerThanMd ? "xl" : 180}>
      <Group h="100%" position="apart">
        {smallerThanSm && isAuthenticated() && (
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        )}
        <Group>
          <Logo />
          {!smallerThanSm && isAuthenticated() && (
            <HeaderLinks links={links} notificationCount={inboxNotifications} />
          )}
        </Group>
        {!smallerThanSm && isAuthenticated() && (
          <ProfileMenuBtn
            avatar={avatar}
            firstName={firstName}
            profileMenuItems={
              isAdmin()
                ? adminProfileMenuItems
                : isUser()
                ? studentProfileMenuItems
                : employerProfileMenuItems
            }
          />
        )}
      </Group>
    </MantineHeader>
  );
}
