import { Group, SegmentedControl, Box, Center } from "@mantine/core";
import { IconLayoutList, IconLayoutKanban } from "@tabler/icons-react";

function SegmentedToggle({ value, setValue }) {
  return (
    <Group position="center" my="xl">
      <SegmentedControl
        value={value}
        onChange={() => setValue(value === "list" ? "kanban" : "list")}
        data={[
          {
            value: "list",
            label: (
              <Center>
                <IconLayoutList size="1rem" stroke={1.5} />
                <Box ml={10}>List</Box>
              </Center>
            ),
          },
          {
            value: "kanban",
            label: (
              <Center>
                <IconLayoutKanban size="1rem" stroke={1.5} />
                <Box ml={10}>Kanban</Box>
              </Center>
            ),
          },
        ]}
      />
    </Group>
  );
}

export default SegmentedToggle;
