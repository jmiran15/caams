import { AppShell, Center, Navbar, Text, useMantineTheme } from "@mantine/core";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import { useContext, useEffect, useMemo, useState } from "react";
import { InboxNotificationCountContext } from "../context/InboxNotificationCountContext";
import { PocketbaseContext } from "../context/PocketbaseContext";
import useSmallerThanSm from "../hooks/useSmallerThanSm";
import { isAdmin, isAuthenticated, isUser } from "../helpers/pocketbase";
import HeaderLinks from "../components/header/HeaderLinks";
import {
  useUserLinks,
  employerLinks,
  studentProfileMenuItems,
  employerProfileMenuItems,
  adminProfileMenuItems,
} from "../helpers/headerData";
import NavLinks from "../components/header/NavLinks";
// import { SubmittedApplicationContext } from "../context/SubmittedApplicationContext";

function Shell() {
  const pb = useContext(PocketbaseContext);
  const { pathname } = useLocation();
  const userLinks = useUserLinks();

  const { setInboxNotifications, inboxNotifications } = useContext(
    InboxNotificationCountContext
  );
  const [opened, setOpened] = useState(false);
  const smallerThanSm = useSmallerThanSm();

  // for confetti
  // const { submittedApplication, setSubmittedApplication } = useContext(
  //   SubmittedApplicationContext
  // );

  // useEffect(() => {
  //   if (submittedApplication) {
  //     setTimeout(() => {
  //       setSubmittedApplication(false);
  //     }, 3000);
  //   }
  // }, [submittedApplication]);

  let user = pb.authStore.model;

  const sticky = useMemo(
    () =>
      !pathname.includes("/student/jobs") &&
      !pathname.includes("/instructor/jobs") &&
      !pathname.includes("/instructor/candidates") &&
      !pathname.includes("/student/profile/public-view/"),
    [pathname]
  );

  useEffect(() => {
    const getUnreadMessages = async () => {
      const data = await pb.collection("messages").getList(1, 50, {
        expand: "from,to",
        filter: `to = "${user.id}" && read = false`,
        sort: "-created",
        $autoCancel: false,
      });
      setInboxNotifications(data.items.length);
    };
    getUnreadMessages();
  }, []);

  const headerComponent = <Header opened={opened} setOpened={setOpened} />;
  const links = isAuthenticated() ? (isUser() ? userLinks : employerLinks) : [];

  return (
    <AppShell
      // fixed={sticky}
      fixed={true}
      header={headerComponent}
      navbar={
        smallerThanSm && (
          <Navbar p="md" hidden={!opened} width={{ sm: 200, lg: 300 }}>
            {isAuthenticated() && (
              <NavLinks
                setOpened={setOpened}
                links={[
                  ...links,
                  ...(isAdmin()
                    ? adminProfileMenuItems
                    : isUser()
                    ? studentProfileMenuItems
                    : employerProfileMenuItems),
                ]}
                notificationCount={inboxNotifications}
              />
            )}
          </Navbar>
        )
      }
    >
      <Outlet />
    </AppShell>
  );
}

export default Shell;
