import { TextInput, Stack, NativeSelect, MultiSelect } from "@mantine/core";
import { useContext } from "react";
import { StatusContext } from "../../context/JobStatusContext";

export default function General({
  title,
  setTitle,
  category,
  setCategory,
  skills,
  setSkills,
}) {
  const status = useContext(StatusContext);

  return (
    <Stack>
      <TextInput
        size="md"
        placeholder="Job title"
        key={1}
        withAsterisk
        label="Write a title for your job post"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        disabled={status?.status ? status.status !== "draft" : false}
      />
      <NativeSelect
        required
        size="md"
        label="Select a category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        data={["engineering", "research", "other"]}
        placeholder="Select category"
        disabled={status?.status ? status.status !== "draft" : false}
      />
      <MultiSelect
        label="What skills are required?"
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
        placeholder="Select skills"
        size="md"
        searchable
        value={skills}
        onChange={setSkills}
        maxSelectedValues={10}
        disabled={status?.status ? status.status !== "draft" : false}
      />
    </Stack>
  );
}
