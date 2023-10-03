import { Title, Box, Card, Checkbox, Stack, Text, Button } from "@mantine/core";

export default function Settings() {
  const email = "abcd123@jhu.edu";

  return (
    <Stack mx={180} mt={30}>
      <Card withBorder padding="md" radius="md">
        <Card.Section withBorder inheritPadding py="md">
          <Title order={3}>Notifications</Title>
        </Card.Section>
        <Stack>
          <Text> You'll receive notifications at {email}.</Text>
          <Checkbox label="Application is received." />
          <Checkbox label="Application moves stages." />
          <Checkbox label="A user sends you a message." />
          <Box>
            <Button variant="light">Save</Button>
          </Box>
        </Stack>
      </Card>

      <Card padding="md" radius="md" withBorder>
        <Card.Section withBorder inheritPadding py="md">
          <Title order={3}>Manage Account</Title>
        </Card.Section>
        <Stack>
          <Text> You can delete your account here.</Text>
          <Box>
            <Button color="red" variant="light">
              Delete
            </Button>
          </Box>
        </Stack>
      </Card>
    </Stack>
  );
}
