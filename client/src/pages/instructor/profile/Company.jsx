import { useState } from "react";
import { Stack, Input, Textarea, Button } from "@mantine/core";

export default function Company({
  editingCompany,
  editingCompanyHandlers,
  company,
  saveCompany,
  admin,
  setCompany,
}) {
  const [name, setName] = useState(company.name);
  const [description, setDescription] = useState(company.description);
  const [homepage, setHomepage] = useState(company.homepage);

  return (
    <Stack spacing="sm" w="100%" align="flex-start">
      <Input
        disabled={!editingCompany}
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
      />
      <Textarea
        disabled={!editingCompany}
        placeholder="Description"
        value={description}
        maxRows={5}
        onChange={(event) => setDescription(event.currentTarget.value)}
      />
      <Input
        disabled={!editingCompany}
        placeholder="Homepage"
        value={homepage}
        onChange={(event) => setHomepage(event.currentTarget.value)}
      />

      <Button
        disabled={!admin}
        onClick={() => {
          if (editingCompany) {
            saveCompany(
              company,
              {
                name,
                description,
                homepage,
              },
              setCompany
            );
          }
          editingCompanyHandlers.toggle();
        }}
      >
        {editingCompany ? "Save" : "Edit"}
      </Button>
    </Stack>
  );
}
