import { Button, Group, MultiSelect } from "@mantine/core";
import { useContext } from "react";
import { PocketbaseContext } from "../../context/PocketbaseContext";

export default function Facets({
  category,
  setCategory,
  skills,
  setSkills,
  experience,
  setExperience,
}) {
  const pb = useContext(PocketbaseContext);
  let user = pb.authStore.model;

  function handleClearFilters() {
    setCategory([]);
    setSkills([]);
    setExperience([]);
  }

  function handleFilterByProfile() {
    setSkills(user.skills);
  }

  return (
    <Group position="left">
      <MultiSelect
        radius="md"
        size="md"
        data={["engineering", "research", "other"]}
        placeholder="Category"
        clearButtonProps={{ "aria-label": "Clear selection" }}
        clearable
        value={category}
        onChange={setCategory}
      />
      <MultiSelect
        radius="md"
        size="md"
        data={[
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
        ]}
        placeholder="Skills"
        clearButtonProps={{ "aria-label": "Clear selection" }}
        clearable
        value={skills}
        onChange={setSkills}
      />
      <MultiSelect
        size="md"
        radius="md"
        data={["no experience", "intermediate", "senior level"]}
        placeholder="Experience level"
        clearButtonProps={{ "aria-label": "Clear selection" }}
        clearable
        value={experience}
        onChange={setExperience}
      />
      <Button size="md" onClick={handleClearFilters} radius="md" color="blue.9">
        Clear all
      </Button>
      <Button
        size="md"
        onClick={handleFilterByProfile}
        radius="md"
        color="blue.9"
      >
        Filter based on my profile
      </Button>
    </Group>
  );
}
