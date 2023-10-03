import { Card, Title } from "@mantine/core";

export default function SettingCard({ title, children }) {
  return (
    <Card withBorder radius="md" padding="xl">
      <Card.Section withBorder inheritPadding py="sm">
        <Title order={3}>{title}</Title>
      </Card.Section>
      <Card.Section inheritPadding py="xl">
        {children}
      </Card.Section>
    </Card>
  );
}
