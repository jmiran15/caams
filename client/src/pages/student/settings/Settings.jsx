import { Box, Card, Checkbox, Stack, Text, Button, Group } from "@mantine/core";

export default function Settings() {
  const email = "abcd123@jhu.edu";

  return (
    <Stack mx={160} mt="xl" spacing="xl">
      <Card withBorder padding="md" radius="md">
        <Card.Section withBorder inheritPadding py="sm">
          <Group position="apart">
            <Text size="lg">Notifications</Text>
            <Button color="blue.9" size="sm" radius="md" disabled>
              Save
            </Button>
          </Group>
        </Card.Section>
        <Card.Section inheritPadding py="xl">
          <Stack>
            <Text>You'll receive notifications at {email}.</Text>
            <Checkbox label="Application is received." />
            <Checkbox label="Application moves stages." />
            <Checkbox label="A user sends you a message." />
          </Stack>
        </Card.Section>
      </Card>
      <Group align="center">
        <Text>Delete your account</Text>
        <Button color="red.9" size="sm" radius="md">
          Delete
        </Button>
      </Group>
    </Stack>
  );
}
