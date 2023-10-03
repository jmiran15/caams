import React, { useContext, useRef } from "react";
import {
  Stack,
  NumberInput,
  TextInput,
  Select,
  Radio,
  Group,
} from "@mantine/core";
import { StatusContext } from "../../context/JobStatusContext";

export default function ScopeSetup({
  experience,
  setExperience,
  payMode,
  setPayMode,
  payFrom,
  setPayFrom,
  payTo,
  setPayTo,
  budget,
  setBudget,
  customBudget,
  setCustomBudget,
}) {
  const typingTimeoutRef = useRef(null);
  const status = useContext(StatusContext);

  const handleInputChangeMin = (value) => {
    // Clear any previous timeouts
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set up a new timeout to update the state after 500ms
    typingTimeoutRef.current = setTimeout(() => {
      setPayFrom(value);
    }, 1200);
  };

  const handleInputChangeMax = (value) => {
    // Clear any previous timeouts
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set up a new timeout to update the state after 500ms
    typingTimeoutRef.current = setTimeout(() => {
      setPayTo(value);
    }, 1200);
  };

  return (
    <Stack>
      <Radio.Group
        value={payMode}
        onChange={setPayMode}
        name="pay"
        label="How will employees be paid?"
        size="md"
      >
        <Group mt="xs">
          <Radio
            value="hourly"
            label="Hourly"
            disabled={status?.status ? status.status !== "draft" : false}
          />
          <Radio
            value="budget"
            label="Budget"
            disabled={status?.status ? status.status !== "draft" : false}
          />
          <Radio
            value="custom"
            label="Custom"
            disabled={status?.status ? status.status !== "draft" : false}
          />
        </Group>
      </Radio.Group>

      {payMode === "hourly" && (
        <Stack>
          <NumberInput
            size="md"
            label="Minimum Hourly Rate"
            value={payFrom}
            min={0}
            placeholder="eg. 15.67"
            precision={2}
            onChange={handleInputChangeMin}
            disabled={status?.status ? status.status !== "draft" : false}
          />
          <NumberInput
            size="md"
            label="Maximum Hourly Rate"
            value={payTo}
            min={0}
            placeholder="eg. 15.67"
            precision={2}
            onChange={handleInputChangeMax}
            disabled={status?.status ? status.status !== "draft" : false}
          />
        </Stack>
      )}
      {payMode === "budget" && (
        <NumberInput
          size="md"
          label="Total Job Budget"
          value={budget}
          placeholder="eg. 1200"
          min={0}
          onChange={setBudget}
          disabled={status?.status ? status.status !== "draft" : false}
        />
      )}
      {payMode === "custom" && (
        <TextInput
          size="md"
          placeholder="eg. 1-3 credits of independent study"
          label="Enter a custom value"
          value={customBudget}
          onChange={(event) => setCustomBudget(event.currentTarget.value)}
          disabled={status?.status ? status.status !== "draft" : false}
        />
      )}
      <Select
        size="md"
        label="How much experience is required?"
        data={["no experience", "intermediate", "senior level"]}
        value={experience}
        onChange={setExperience}
        placeholder="Pick One"
        disabled={status?.status ? status.status !== "draft" : false}
      />
    </Stack>
  );
}
