import { Stack, TextInput, Button, rem, Tooltip } from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import { useClipboard } from "@mantine/hooks";

export default function Link() {
  const clipboard = useClipboard();

  // modal with link and button to copy the link
  // standard expiration date,
  // replace link when expired
  return (
    <Stack>
      <TextInput disabled />
      <Tooltip
        label="Link copied!"
        offset={5}
        position="bottom"
        radius="xl"
        transitionProps={{ duration: 100, transition: "slide-down" }}
        opened={clipboard.copied}
      >
        <Button
          variant="light"
          rightIcon={
            clipboard.copied ? (
              <IconCheck size="1.2rem" stroke={1.5} />
            ) : (
              <IconCopy size="1.2rem" stroke={1.5} />
            )
          }
          radius="xl"
          size="md"
          styles={{
            root: { paddingRight: rem(14), height: rem(48) },
            rightIcon: { marginLeft: rem(22) },
          }}
          onClick={() => {}}
        >
          Copy link to clipboard
        </Button>
      </Tooltip>
    </Stack>
  );
}
