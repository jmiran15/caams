import { lazy, useState } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  Center,
  Text,
  Loader,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { Routes, Route } from "react-router-dom";
import useStoreTheme from "./hooks/useStoreTheme";
import Loadable from "./components/Loadable";
import PersonalInfo from "./pages/student/profile/personal/PersonalInfo";
import Experience from "./pages/student/profile/experience/Experience";
import Education from "./pages/student/profile/education/Education";
import Skills from "./pages/student/profile/skills/Skills";
import PublicProfile from "./components/PublicProfile";
import FullPublicProfile from "./components/FullPublicProfile";
import Templates from "./pages/instructor/templates/Templates";
import TemplateReview from "./pages/instructor/job/review/Review";
import OnboardingProtected from "./layouts/OnboardingProtected";
import { InboxNotificationCountContext } from "./context/InboxNotificationCountContext";
import { PocketbaseContext } from "./context/PocketbaseContext";
import { useMediaQuery } from "@mantine/hooks";
// import { SubmittedApplicationContext } from "./context/SubmittedApplicationContext";

import PocketBase from "pocketbase";
const pb = new PocketBase("http://10.203.70.207:8090");
// const pb = new PocketBase("https://caamsjhu.pockethost.io");
pb.autoCancellation(false);

const EmployerSettings = Loadable(
  lazy(() => import("./pages/instructor/settings/Settings"))
);
// const StudentSettings = Loadable(
//   lazy(() => import("./pages/student/settings/Settings"))
// );
const Login = Loadable(lazy(() => import("./pages/login/Login")));
const Signup = Loadable(lazy(() => import("./pages/signup/Signup")));
const SSOSignup = Loadable(lazy(() => import("./pages/signup/SSOSignup")));
const NotFound = Loadable(lazy(() => import("./pages/NotFound")));
const ProtectedRoute = Loadable(lazy(() => import("./layouts/ProtectedRoute")));
const Shell = Loadable(lazy(() => import("./layouts/Shell")));
const StudentOnlyRoute = Loadable(
  lazy(() => import("./layouts/StudentOnlyRoute"))
);
const StudentProfile = Loadable(
  lazy(() => import("./pages/student/profile/Profile"))
);
const StudentApplications = Loadable(
  lazy(() => import("./pages/student/applications/Applications"))
);
const StudentJobs = Loadable(lazy(() => import("./pages/student/jobs/Jobs")));
const Inbox = Loadable(lazy(() => import("./pages/inbox/Inbox")));
const InstructorOnlyRoute = Loadable(
  lazy(() => import("./layouts/InstructorOnlyRoute"))
);
const InstructorJobs = Loadable(
  lazy(() => import("./pages/instructor/jobs/Jobs"))
);
const Candidates = Loadable(
  lazy(() => import("./pages/instructor/database/Database"))
);

const NewJob = Loadable(lazy(() => import("./pages/instructor/newjob/NewJob")));
const InstructorJob = Loadable(
  lazy(() => import("./pages/instructor/job/Job"))
);
const InstructorJobDashboard = Loadable(
  lazy(() => import("./pages/instructor/job/dashboard/Dashboard"))
);
const InstructorJobCandidates = Loadable(
  lazy(() => import("./pages/instructor/job/applications/Applications"))
);

const JobSetup = Loadable(
  lazy(() => import("./pages/instructor/job/settings/Settings"))
);

const Users = Loadable(lazy(() => import("./pages/instructor/users/Users")));

const AdminOnlyRoute = Loadable(lazy(() => import("./layouts/AdminOnlyRoute")));

const EmployerProfile = Loadable(
  lazy(() => import("./pages/instructor/profile/Profile"))
);

const JobDetail = Loadable(lazy(() => import("./components/DetailView")));

function App() {
  const { colorScheme, toggleColorScheme } = useStoreTheme();
  const [inboxNotifications, setInboxNotifications] = useState(0);
  const [submittedApplication, setSubmittedApplication] = useState(false);
  const matches = useMediaQuery("(min-width: 62em)");

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        {/* {matches ? ( */}
        <ModalsProvider>
          <NotificationsProvider position="top-center">
            <PocketbaseContext.Provider value={pb}>
              <InboxNotificationCountContext.Provider
                value={{
                  inboxNotifications,
                  setInboxNotifications,
                }}
              >
                {/* <SubmittedApplicationContext.Provider
                  value={{
                    submittedApplication,
                    setSubmittedApplication,
                  }}
                > */}
                <Routes>
                  <Route path="login" element={<Login />} />
                  <Route path="signup/*" element={<Signup />} />
                  <Route path="sso-signup/*" element={<SSOSignup />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/" element={<ProtectedRoute />}>
                    <Route path="/" element={<Shell />}>
                      <Route path="student/" element={<StudentOnlyRoute />}>
                        {/* <Route path="settings" element={<StudentSettings />} /> */}
                        <Route path="profile" element={<StudentProfile />}>
                          <Route path="personal" element={<PersonalInfo />} />
                          <Route path="experience" element={<Experience />} />
                          <Route path="education" element={<Education />} />
                          <Route path="skills" element={<Skills />} />
                          <Route
                            path="public-view/:id"
                            element={<PublicProfile />}
                          />
                        </Route>
                        <Route element={<OnboardingProtected />}>
                          <Route
                            path="applications"
                            element={<StudentApplications />}
                          />
                          <Route path="jobs" element={<StudentJobs />}>
                            <Route path=":id" element={<JobDetail />} />
                          </Route>
                          <Route path="inbox" element={<Inbox />} />
                        </Route>
                      </Route>
                      <Route
                        path="instructor/"
                        element={<InstructorOnlyRoute />}
                      >
                        <Route path="settings" element={<EmployerSettings />} />
                        <Route path="jobs" element={<InstructorJobs />} />
                        <Route path="templates" element={<Templates />} />
                        <Route
                          path="templates/:templateid"
                          element={<TemplateReview />}
                        />

                        <Route path="candidates" element={<Candidates />}>
                          <Route path=":id" element={<PublicProfile />} />
                        </Route>
                        <Route path="inbox" element={<Inbox />} />
                        <Route path="newjob" element={<NewJob />} />
                        <Route path="jobs/:id" element={<InstructorJob />}>
                          <Route
                            index
                            path="dashboard"
                            element={<InstructorJobDashboard />}
                          />
                          <Route
                            path="candidates"
                            element={<InstructorJobCandidates />}
                          >
                            <Route
                              path=":applicationid"
                              element={<FullPublicProfile />}
                            />
                          </Route>
                          <Route path="settings" element={<JobSetup />} />
                        </Route>
                        <Route path="profile" element={<EmployerProfile />} />
                      </Route>
                      <Route path="admin/" element={<AdminOnlyRoute />}>
                        <Route path="users" element={<Users />} />
                      </Route>
                    </Route>
                  </Route>
                </Routes>
                {/* </SubmittedApplicationContext.Provider> */}
              </InboxNotificationCountContext.Provider>
            </PocketbaseContext.Provider>
          </NotificationsProvider>
        </ModalsProvider>
        {/* ) : matches === undefined ? ( */}
        {/* <Center h="100vh" w="100vw" p="xl">
            <Loader />
          </Center>
        ) : (
          <Center h="100vh" w="100vw" p="xl">
            <Text>CAAMs is not supported on mobile devices yet.</Text>
          </Center>
        )} */}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
