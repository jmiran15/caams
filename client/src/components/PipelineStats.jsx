import { Text, Card, createStyles, rem, Group } from "@mantine/core";

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

export default function PipelineStats({ stages, applications }) {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="lg" p="xl">
      <Text fz="lg" fw={500} mb="xl">
        Pipeline
      </Text>
      {stages.map((stage) => (
        <Group key={stage.id} position="apart" noWrap className={classes.item}>
          <Text>{stage.label}</Text>
          <Text>
            {
              applications.filter(
                (application) => application.stage === stage.id
              ).length
            }
          </Text>
        </Group>
      ))}
    </Card>
  );
}
