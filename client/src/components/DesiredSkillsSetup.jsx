import { MultiSelect } from "@mantine/core";

export default function DesiredSkillsSetup({
  desiredSkills,
  setDesiredSkills,
}) {
  //override for now, may want to store this in the database later
  const possibleSkills = [
    "java",
    "cpp",
    "c",
    "docker",
    "python",
    "javascript",
    "html",
    "css",
    "react",
    "swift",
    "kotlin",
    "golang",
    "sql",
    "aws",
    "azure",
    "git",
    "machine learning",
    "tensorflow",
  ];

  return (
    <MultiSelect
      size="md"
      data={possibleSkills}
      value={desiredSkills}
      onChange={setDesiredSkills}
      label="Select your desired skills (Begin typing to search)"
      placeholder="Pick all that you like"
      searchable
      nothingFound="Nothing found"
    />
  );
}
