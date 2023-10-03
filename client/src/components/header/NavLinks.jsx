import {
  Group,
  createStyles,
  rem,
  useMantineTheme,
  Badge,
  Stack,
  Button,
  Text,
} from "@mantine/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useHover } from "@mantine/hooks";
import { isAuthenticated, logout } from "../../helpers/pocketbase";
import { useContext } from "react";
import { PocketbaseContext } from "../../context/PocketbaseContext";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colors.gray[0],
    },
  },
}));

function NavLink({ link, notificationCount, setOpened }) {
  const { ref } = useHover();
  const location = useLocation();
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const isSelectedInPath = location.pathname.includes(link.link);

  return (
    <Link
      onClick={() => setOpened((opened) => !opened)}
      to={link.link}
      ref={ref}
      className={classes.link}
      style={{
        backgroundColor: isSelectedInPath ? theme.colors.gray[0] : null,
      }}
    >
      {link.label} {notificationCount ? { notificationCount } : null}
    </Link>
  );
}

export default function NavLinks({ links, notificationCount, setOpened }) {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const pb = useContext(PocketbaseContext);

  return (
    <Stack spacing="xs">
      {links.map((link) => (
        <NavLink
          setOpened={setOpened}
          key={link.label}
          link={link}
          notificationCount={link.label === "Inbox" ? notificationCount : null}
        />
      ))}
      {/* we should have a route "/lougout" which logs out */}
      {isAuthenticated() && (
        <Text
          className={classes.link}
          onClick={() => {
            console.log("logging out");
            pb.authStore.clear();
            navigate("/login");
          }}
        >
          Logout
        </Text>
      )}
    </Stack>
  );
}
