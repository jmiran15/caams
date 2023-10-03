import { Card, Group, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";

export default function ApplicationListItem({
  application,
  handleOpenApplication,
}) {
  return (
    <Card
      withBorder
      radius="md"
      padding="md"
      onClick={handleOpenApplication}
      style={{
        cursor: "pointer",
      }}
    >
      <Group position="apart">
        <Text>{application.expand.stage?.expand.job?.title}</Text>
        <Stack spacing="0">
          <Text>{application.status}</Text>
          <Text>{dayjs(application.created).format("MMMM D, YYYY")}</Text>
        </Stack>
      </Group>
    </Card>
  );
}
