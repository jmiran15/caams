import { Button, Stack, Modal, Text, Group, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import DndListHandle from "./DraggableList";
import { useContext, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import { StatusContext } from "../context/JobStatusContext";

export default function DraggableStage({ data, dataHandlers }) {
  const status = useContext(StatusContext);

  const [opened, handlers] = useDisclosure(false);
  const [item, setItem] = useState("");
  const [selected, setSelected] = useState(null);

  // on click an item
  function update(item) {
    handlers.open();
    setItem(item.label);
    setSelected(item);
  }

  function updateItem() {
    let newD = data.map((i) => {
      if (i.id === selected.id) {
        i.label = item;
      }
      return i;
    });
    dataHandlers.setState(newD);
  }

  function createItem() {
    console.log("the new item: ", item);

    // make sure no duplicate labels, return and dont add if so
    if (data.some((i) => i.label === item)) {
      return;
    }

    let newId = data[data.length - 1]
      ? parseInt(data[data.length - 1].id) + 1
      : 0;

    // make sure no duplicate ids
    while (data.some((item) => item.id === `${newId}`)) {
      newId++;
    }

    let newD = data.concat({ id: `${newId}`, label: item });
    dataHandlers.setState(newD);
  }

  function save() {
    if (selected) {
      updateItem();
    } else {
      createItem();
    }
    setSelected(null);
    setItem("");
    handlers.close();
  }

  function deleteItem() {
    let newD = data.filter((item) => item.id !== selected.id);
    dataHandlers.setState(newD);
    setSelected(null);
    setItem("");
    handlers.close();
  }

  function openModal() {
    // clear item
    setItem("");
    // open modal
    handlers.open();
  }

  return (
    <Stack spacing="md">
      <Modal
        padding="xl"
        opened={opened}
        onClose={() => {
          handlers.close();
          setSelected(null);
        }}
        title={selected ? "Edit item" : "Create item"}
      >
        <Stack>
          <TextInput
            label="Label"
            value={item}
            onChange={(e) => setItem(e.currentTarget.value)}
          />
          <Group position="apart">
            {selected && (
              <Button
                variant="light"
                color="red"
                onClick={() => deleteItem()}
                size="md"
                radius="md"
              >
                Delete
              </Button>
            )}

            <Button size="md" radius="md" color="blue.9" onClick={() => save()}>
              {selected ? "Save" : "Create"}
            </Button>
          </Group>
        </Stack>
      </Modal>
      <Button
        style={{
          alignSelf: "flex-end",
        }}
        size="md"
        radius="md"
        color="blue.9"
        onClick={openModal}
        disabled={status?.status ? status.status !== "draft" : false}
      >
        <Group position="apart">
          <IconPlus />
          <Text>Add an item</Text>
        </Group>
      </Button>
      <DndListHandle data={data} dataHandlers={dataHandlers} update={update} />
    </Stack>
  );
}
