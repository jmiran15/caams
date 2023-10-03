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

const UpdateEducation = ({ education, update }) => {
  const [school, setSchool] = useInputState(education.school);
  const [field, setField] = useInputState(education.field);
  const [from, setFrom] = useInputState(new Date(education.from));
  const [to, setTo] = useInputState(new Date(education.to));

  const save = () => {
    const data = {
      school,
      field,
      from,
      to,
    };
    update(education.id, data);
  };

  return (
    <Stack>
      <Input placeholder="School Name" value={school} onChange={setSchool} />
      <Input placeholder="Field" value={field} onChange={setField} />
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
      <Flex direction="row" justify="flex-end" align="center" w="100%">
        <Button onClick={save}>Save</Button>
      </Flex>
    </Stack>
  );
};

export default UpdateEducation;
