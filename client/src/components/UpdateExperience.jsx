import {
  Stack,
  Input,
  Grid,
  Flex,
  Text,
  Checkbox,
  Textarea,
  Button,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useInputState } from "@mantine/hooks";

const UpdateExperience = ({ experience, update }) => {
  const [title, setTitle] = useInputState(experience.title);
  const [employer, setEmployer] = useInputState(experience.employer);
  const [location, setLocation] = useInputState(experience.location);
  const [current, setCurrent] = useInputState(experience.current);
  const [from, setFrom] = useInputState(new Date(experience.from));
  const [to, setTo] = useInputState(new Date(experience.to));
  const [summary, setSummary] = useInputState(experience.summary);

  const save = () => {
    const data = {
      title,
      employer,
      location,
      current,
      from,
      to,
      summary,
    };
    update(experience.id, data);
  };

  return (
    <Stack>
      <Input
        placeholder="Employer Name"
        value={employer}
        onChange={setEmployer}
      />
      <Input placeholder="Title" value={title} onChange={setTitle} />
      <Input
        placeholder="Location (optional)"
        value={location}
        onChange={setLocation}
      />
      <Checkbox
        label="I currently work here"
        checked={current}
        onChange={setCurrent}
      />
      <Grid>
        <Grid.Col span={6}>
          <Flex>
            <Grid align="center" justify="flex-start" columns={100}>
              <Grid.Col span="content">
                <Flex
                  direction="row"
                  justify="flex-start"
                  align="center"
                  gap="sm"
                >
                  <Text weight={500}>From</Text>
                  <DateInput value={from} onChange={setFrom} />
                </Flex>
              </Grid.Col>
            </Grid>
          </Flex>
        </Grid.Col>
        <Grid.Col span={6}>
          <Flex>
            <Grid align="center" justify="flex-start" columns={100}>
              <Grid.Col span="content">
                <Flex
                  direction="row"
                  justify="flex-start"
                  align="center"
                  gap="sm"
                >
                  <Text weight={500}>To</Text>
                  <DateInput value={to} onChange={setTo} />
                </Flex>
              </Grid.Col>
            </Grid>
          </Flex>
        </Grid.Col>
      </Grid>

      <Textarea
        placeholder="Summary (optional)"
        autosize
        minRows={3}
        value={summary}
        onChange={setSummary}
      />
      <Flex direction="row" justify="flex-end" align="center" w="100%">
        <Button onClick={save}>Save</Button>
      </Flex>
    </Stack>
  );
};

export default UpdateExperience;
