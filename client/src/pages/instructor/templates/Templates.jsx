import {
  Button,
  Card,
  Center,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useHover } from "@mantine/hooks";
import { PocketbaseContext } from "../../../context/PocketbaseContext";

export default function Templates() {
  const pb = useContext(PocketbaseContext);
  const [templates, setTemplates] = useState(undefined);
  const user = pb.authStore.model;
  const navigate = useNavigate();

  useEffect(() => {
    pb.collection("jobs")
      .getFullList({
        sort: "-created",
        expand: "createdBy",
        filter: `(team ~ "${user.id}" || createdBy = "${user.id}") && isTemplate = true && isDeleted = false`,
      })
      .then((templates) => setTemplates(templates))
      .catch((err) => console.log(err));
  }, []);

  function handleCreateTemplate() {
    // create a new empty job in db with isTemplate set to true
    // navigate to /instructor/templates/:templateId which will be the job review page (where users can edit everything about the job, except that isTemplate is set to true)

    pb.collection("jobs")
      .create({
        templateName: "New empty template",
        isTemplate: true,
        createdBy: user.id,
      })
      .then((res) => navigate(`/instructor/templates/${res.id}`))
      .catch((err) => console.log(err));
  }

  return (
    <Stack px={160} w="100%" py="xl" align="center">
      <Button
        size="md"
        radius="md"
        color="blue.9"
        style={{
          alignSelf: "flex-end",
        }}
        onClick={handleCreateTemplate}
      >
        Create Template
      </Button>
      {templates?.length > 0 ? (
        templates.map((template) => (
          <TemplateRow key={template.id} template={template} />
        ))
      ) : (
        <Card withBorder padding="md" radius="md" w="100%">
          <Center>
            <Text>No templates yet. Click the button above to create one.</Text>
          </Center>
        </Card>
      )}
    </Stack>
  );
}

function TemplateRow({ template }) {
  const navigate = useNavigate();
  const { hovered, ref } = useHover();
  const theme = useMantineTheme();

  return (
    <Card
      withBorder
      ref={ref}
      padding="md"
      radius="md"
      w="100%"
      key={template.id}
      style={{
        cursor: "pointer",
        backgroundColor: hovered ? theme.colors.gray[0] : undefined,
      }}
      onClick={() => navigate(`/instructor/templates/${template.id}`)}
    >
      <Text>{template.templateName}</Text>
    </Card>
  );
}
