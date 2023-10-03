import { Stack, MultiSelect, Button } from "@mantine/core";
import { useContext, useState } from "react";
import { PocketbaseContext } from "../../../../context/PocketbaseContext";

const Skills = () => {
  const pb = useContext(PocketbaseContext);
  let user = pb.authStore.model;
  const [skills, setSkills] = useState(user.skills);

  // hardcode?
  const SKILLS = [
    "java",
    "cpp",
    "c",
    "docker",
    "python",
    "javascript",
    "html",
    "css",
    "node.js",
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
    "data analysis",
  ];

  function handleSave() {
    pb.collection("user")
      .update(user.id, {
        skills: skills,
      })
      .then((res) => console.log({ res }));
  }

  return (
    <Stack w="100%">
      <MultiSelect
        label="Which technologies/skills are you most experienced and interested in working with? (Choose up to 10)"
        data={SKILLS}
        placeholder="Select skills"
        size="sm"
        searchable
        maxSelectedValues={10}
        value={skills}
        onChange={setSkills}
      />
      <Button
        onClick={handleSave}
        style={{
          alignSelf: "flex-end",
        }}
        radius="md"
        size="md"
        color="blue.9"
      >
        Save
      </Button>
    </Stack>
  );
};

export default Skills;
