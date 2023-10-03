import { Text, Group, createStyles, Avatar, rem, Card } from "@mantine/core";
import { loadAvatar } from "../helpers/pocketbase";
import { useContext } from "react";
import { PocketbaseContext } from "../context/PocketbaseContext";

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const useStyles = createStyles((theme) => ({
  item: {
    "& + &": {
      paddingTop: theme.spacing.sm,
      marginTop: theme.spacing.sm,
      borderTop: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },
  },
}));

function TeamItem({ teamMember }) {
  const pb = useContext(PocketbaseContext);
  const { classes } = useStyles();

  const avatar = loadAvatar(pb, teamMember);

  let randomColor = undefined;

  switch (randomIntFromInterval(1, 6)) {
    case 1:
      randomColor = "red.3";
      break;
    case 2:
      randomColor = "pink.3";
      break;
    case 3:
      randomColor = "grape.3";
      break;
    case 4:
      randomColor = "violet.3";
      break;
    case 5:
      randomColor = "indigo.3";
      break;
    case 6:
      randomColor = "blue.3";
      break;
    default:
      randomColor = "gray.3";
      break;
  }

  return (
    <Card withBorder radius="md" padding="md">
      <Group className={classes.item} noWrap spacing="xl">
        {/* {avatar ? (
          <Avatar src={avatar} radius="xl" size="md" />
        ) : (
          <Avatar variant="filled" radius="xl" size="md" color={randomColor}>
            {teamMember.firstName.slice(0, 1).toUpperCase()}{" "}
            {teamMember.lastName.slice(0, 1).toUpperCase()}
          </Avatar>
        )} */}
        <div>
          <Text>
            {teamMember.firstName} {teamMember.lastName}
          </Text>
          <Text size="xs" color="dimmed">
            {teamMember.email}
          </Text>
        </div>
      </Group>
    </Card>
  );
}

export default TeamItem;
