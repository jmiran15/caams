import { Group, MultiSelect } from "@mantine/core";

export default function Facets({ skills, setSkills }) {
  return (
    <Group>
      <MultiSelect
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
    </Group>
  );
}
