import { Group, MultiSelect } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { PocketbaseContext } from "../../context/PocketbaseContext";

export default function Facets({
  statusFilter,
  setStatusFilter,
  createdByFilter,
  setCreatedByFilter,
  templateFilter,
  setTemplateFilter,
}) {
  const pb = useContext(PocketbaseContext);

  // we need to get the team, (i.e. associates) so that we can show this list in the created by
  // created by should have the associate name as label and their id as the value
  const [associates, setAssociates] = useState([]);
  const [templates, setTemplates] = useState([]);
  let user = pb.authStore.model;

  useEffect(() => {
    Promise.all([
      pb
        .collection("user")
        .getFullList({
          filter: `admin = "${
            user.isAdmin ? user.id : user.admin
          }" && role = "employer" && id != "${user.id}"`,
        })
        .then((associates) => associates)
        .catch((err) => console.log(err)),
      pb
        .collection("jobs")
        .getFullList({
          sort: "-created",
          expand: "createdBy",
          filter: `(team ~ "${user.id}" || createdBy = "${user.id}") && isTemplate = true`,
        })
        .then((templates) => templates)
        .catch((err) => console.log(err)),
    ]).then(([associates, templates]) => {
      // add self to associates list
      setAssociates([...associates, user]);
      setTemplates(templates);
    });
  }, []);

  return (
    <Group
      style={{
        alignSelf: "flex-start",
      }}
    >
      <MultiSelect
        radius="md"
        size="md"
        data={["draft", "active", "closed", "pending"]}
        placeholder="Status"
        clearButtonProps={{ "aria-label": "Clear selection" }}
        clearable
        value={statusFilter}
        onChange={setStatusFilter}
      />
      <MultiSelect
        radius="md"
        size="md"
        data={associates.map((associate) => {
          return {
            label: `${associate.firstName} ${associate.lastName}`,
            value: associate.id,
          };
        })}
        placeholder="Created by"
        clearButtonProps={{ "aria-label": "Clear selection" }}
        clearable
        value={createdByFilter}
        onChange={setCreatedByFilter}
      />
      <MultiSelect
        radius="md"
        size="md"
        data={templates?.map((template) => {
          return {
            label: template.templateName,
            value: template.id,
          };
        })}
        placeholder="Template"
        clearButtonProps={{ "aria-label": "Clear selection" }}
        clearable
        value={templateFilter}
        onChange={setTemplateFilter}
      />
    </Group>
  );
}
