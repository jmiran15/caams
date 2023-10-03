import {
  NumberInput,
  TextInput,
  Textarea,
  Checkbox,
  Radio,
  Stack,
} from "@mantine/core";

export default function Question({
  label,
  description,
  options,
  required,
  type,
  d,
  value,
  onChange,
  error,
}) {
  switch (type) {
    case "shortText":
      return (
        <TextInput
          label={label}
          description={description}
          value={value}
          onChange={onChange}
          disabled={d}
          error={error}
          withAsterisk={required}
        />
      );
    case "longText":
      return (
        <Textarea
          label={label}
          description={description}
          value={value}
          onChange={onChange}
          disabled={d}
          error={error}
          withAsterisk={required}
        />
      );
    case "number":
      return (
        <NumberInput
          label={label}
          description={description}
          value={value}
          onChange={onChange}
          precision={2}
          disabled={d}
          error={error}
          withAsterisk={required}
        />
      );
    case "checkbox":
      return (
        <Checkbox.Group
          label={label}
          description={description}
          value={value}
          onChange={onChange}
          error={error}
          withAsterisk={required}
        >
          <Stack mt="xs">
            {options.split("\n").map((option, index) => (
              <Checkbox
                key={index}
                value={option}
                label={option}
                disabled={d}
              />
            ))}
          </Stack>
        </Checkbox.Group>
      );
    case "radio":
      return (
        <Radio.Group
          label={label}
          description={description}
          value={value}
          onChange={onChange}
          error={error}
          withAsterisk={required}
        >
          <Stack mt="xs">
            {options.split("\n").map((option, index) => (
              <Radio key={index} value={option} label={option} disabled={d} />
            ))}
          </Stack>
        </Radio.Group>
      );
    default:
      return null;
  }
}
