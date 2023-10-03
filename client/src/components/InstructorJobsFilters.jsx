Card,
  TextInput,
  Flex,
  Text,
  NativeSelect,
  // import {Anchor,
  // Grid,
  // Checkbox,
  // Tooltip,
  // Badge,
  // } from "@mantine/core";
  // import {
  // IconTrash,
  // IconChevronDown,
  // IconBriefcase,
  // IconTemplate,
  // IconSelect,
  // } from "@tabler/icons-react";

  // const useStyles = createStyles((theme) => ({
  // button: {
  //   borderTopRightRadius: 0,
  //   borderBottomRightRadius: 0,
  // },

  // menuControl: {
  //   borderTopLeftRadius: 0,
  //   borderBottomLeftRadius: 0,
  //   border: 0,
  //   borderLeft: `${rem(1)} solid ${
  //     theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
  //   }`,
  // },
  // }));

  {
    /* <Stack spacing="0.4rem" w="100%">
  <Card withBorder px="lg" py="xs" radius="md" w="100%">
    <Grid>
      <Grid.Col span="auto">
        <TextInput placeholder="Search jobs" size="sm" radius="md" />
      </Grid.Col>
      <Grid.Col span="content">
        <Group>
          <NativeSelect
            placeholder="Filter by"
            size="sm"
            data={["Created at", "Updated at", "Deadline"]}
          />
          <NativeSelect
            placeholder="View"
            size="sm"
            data={["List view", "Grid view"]}
          />
          <Anchor>hide filters</Anchor>
        </Group>
      </Grid.Col>
    </Grid>
    <Group className="facets" spacing="lg">
      <Stack spacing="0.2rem" py="md">
        <Text size="sm">Status</Text>
        <Group spacing="0.2rem">
          <Checkbox size="xs" label="Open" />
          <Badge size="xs" color="gray">
            2
          </Badge>
        </Group>
        <Group spacing="0.2rem">
          <Checkbox size="xs" label="Closed" />
          <Badge size="xs" color="gray">
            1
          </Badge>
        </Group>
        <Group spacing="0.2rem">
          <Checkbox size="xs" label="Draft" />
          <Badge size="xs" color="gray">
            4
          </Badge>
        </Group>
      </Stack>
      <Stack spacing="0.2rem" py="md">
        <Text size="sm">Status</Text>
        <Group spacing="0.2rem">
          <Checkbox size="xs" label="Open" />
          <Badge size="xs" color="gray">
            2
          </Badge>
        </Group>
        <Group spacing="0.2rem">
          <Checkbox size="xs" label="Closed" />
          <Badge size="xs" color="gray">
            1
          </Badge>
        </Group>
        <Group spacing="0.2rem">
          <Checkbox size="xs" label="Draft" />
          <Badge size="xs" color="gray">
            4
          </Badge>
        </Group>
      </Stack>
      <Stack spacing="0.2rem" py="md">
        <Text size="sm">Status</Text>
        <Group spacing="0.2rem">
          <Checkbox size="xs" label="Open" />
          <Badge size="xs" color="gray">
            2
          </Badge>
        </Group>
        <Group spacing="0.2rem">
          <Checkbox size="xs" label="Closed" />
          <Badge size="xs" color="gray">
            1
          </Badge>
        </Group>
        <Group spacing="0.2rem">
          <Checkbox size="xs" label="Draft" />
          <Badge size="xs" color="gray">
            4
          </Badge>
        </Group>
      </Stack>
      <Stack spacing="0.2rem" py="md">
        <Text size="sm">Status</Text>
        <Group spacing="0.2rem">
          <Checkbox size="xs" label="Open" />
          <Badge size="xs" color="gray">
            2
          </Badge>
        </Group>
        <Group spacing="0.2rem">
          <Checkbox size="xs" label="Closed" />
          <Badge size="xs" color="gray">
            1
          </Badge>
        </Group>
        <Group spacing="0.2rem">
          <Checkbox size="xs" label="Draft" />
          <Badge size="xs" color="gray">
            4
          </Badge>
        </Group>
      </Stack>
    </Group>
  </Card>

  <Card withBorder px="lg" py="xs" radius="md" w="100%">
    <Group position="apart">
      <Checkbox label="Select all" />

      <Group spacing="xs">
        <Button
          variant="light"
          size="xs"
          color="gray"
          leftIcon={<IconTrash size="1rem" />}
        >
          Delete job/s
        </Button>

        <Button
          variant="light"
          size="xs"
          color="gray"
          leftIcon={<IconSelect size="1rem" />}
        >
          Select job/s
        </Button>

        <ButtonMenu />
        <SplitButton />
      </Group>
    </Group>
  </Card>
</Stack>;

function SplitButton() {
  const navigate = useNavigate();

  const { classes, theme } = useStyles();
  const menuIconColor =
    theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 5 : 6];

  return (
    <Group noWrap spacing={0}>
      <Button
        className={classes.button}
        onClick={() => navigate("/instructor/newjob")}
        size="xs"
      >
        New job
      </Button>
      <Menu
        transitionProps={{ transition: "pop" }}
        position="bottom-end"
        withinPortal
      >
        <Menu.Target>
          <ActionIcon
            variant="filled"
            color={theme.primaryColor}
            size={30}
            className={classes.menuControl}
          >
            <IconChevronDown size="1rem" stroke={1.5} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            icon={
              <IconBriefcase size="1rem" stroke={1.5} color={menuIconColor} />
            }
          >
            Job
          </Menu.Item>

          <Menu.Item
            icon={
              <IconTemplate size="1rem" stroke={1.5} color={menuIconColor} />
            }
          >
            Template
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}

export function ButtonMenu() {
  return (
    <Menu
      transitionProps={{ transition: "pop-top-right" }}
      position="top-end"
      width={220}
      withinPortal
    >
      <Menu.Target>
        <Button
          variant="light"
          color="gray"
          size="xs"
          rightIcon={<IconChevronDown size="1.05rem" stroke={1.5} />}
          pr={12}
        >
          Change job status
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>Active</Menu.Item>
        <Menu.Item>Draft</Menu.Item>
        <Menu.Item>Closed</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
} */
  };
