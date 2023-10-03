import {
  Group,
  createStyles,
  rem,
  useMantineTheme,
  Badge,
} from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { useHover } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colors.gray[0],
    },
  },
}));

function HeaderLink({ link, notificationCount }) {
  const { ref } = useHover();
  const { classes } = useStyles();
  const location = useLocation();
  const theme = useMantineTheme();
  const isSelectedInPath = location.pathname.includes(link.link);

  return (
    <Link
      to={link.link}
      ref={ref}
      className={classes.link}
      style={{
        backgroundColor: isSelectedInPath ? theme.colors.gray[0] : null,
        position: "relative", // Add position relative for badge positioning
        display: "inline-block", // Add inline-block for proper layout
      }}
    >
      {link.label}{" "}
      {notificationCount ? (
        <Badge
          size="sm"
          color="blue.9"
          style={{
            position: "absolute",
            top: "-8px", // Adjust top position as needed
            right: "-8px", // Adjust right position as needed
          }}
        >
          {notificationCount}
        </Badge>
      ) : null}
    </Link>
  );
}

export default function HeaderLinks({ links, notificationCount }) {
  return (
    <Group spacing="xs">
      {links.map(
        // map over the links, if it has a label of inbox display the notification count
        (link) => (
          <HeaderLink
            key={link.label}
            link={link}
            notificationCount={
              link.label === "Inbox" ? notificationCount : null
            }
          />
        )
      )}
    </Group>
  );
}
