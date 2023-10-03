import { Title } from "@mantine/core";

export default function Logo({ title = "CAAMS" }) {
  return (
    <Title order={3} mr="sm">
      {title}
    </Title>
  );
}
