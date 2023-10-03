export const useUserLinks = () => {
  return [
    {
      label: "Jobs",
      link: "/student/jobs",
    },
    {
      label: " My Applications",
      link: "/student/applications",
    },
    {
      label: "Inbox",
      link: "/student/inbox",
    },
  ];
};

export const employerLinks = [
  {
    label: "Jobs",
    link: "/instructor/jobs",
  },
  {
    label: "Templates",
    link: "/instructor/templates",
  },
  {
    label: " Candidates",
    link: "/instructor/candidates",
  },
  {
    label: "Inbox",
    link: "/instructor/inbox",
  },
];

export const profileMenuItems = [
  {
    label: "Profile",
    link: "/student/editprofile",
  },
  // {
  //   label: "Settings",
  //   link: "",
  // },
];

export const studentProfileMenuItems = [
  {
    label: "Profile",
    link: "/student/profile/personal",
  },
  // {
  //   label: "Settings",
  //   link: "/student/settings",
  // },
];

export const employerProfileMenuItems = [
  {
    label: "Profile",
    link: "/instructor/profile",
  },
  // {
  //   label: "Settings",
  //   link: "/instructor/settings",
  // },
];

export const adminProfileMenuItems = [
  {
    label: "Profile",
    link: "/instructor/profile",
  },
  {
    label: "Users",
    link: "/admin/users",
  },
  // {
  //   label: "Settings",
  //   link: "/instructor/settings",
  // },
];
