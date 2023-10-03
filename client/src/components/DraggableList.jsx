import { Card, Center, createStyles, rem, Text } from "@mantine/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IconGripVertical } from "@tabler/icons-react";
import { useContext } from "react";
import { StatusContext } from "../context/JobStatusContext";

const useStyles = createStyles((theme) => ({
  item: {
    display: "flex",
    alignItems: "center",
    borderRadius: theme.radius.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    paddingLeft: `calc(${theme.spacing.xl} - ${theme.spacing.md})`, // to offset drag handle
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
    cursor: "pointer",
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: rem(30),
    fontWeight: 700,
    width: rem(60),
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
}));

export default function DndListHandle({ data, dataHandlers, update }) {
  const status = useContext(StatusContext);

  const { classes, cx } = useStyles();
  const items = data.length ? (
    data.map((item, index) => (
      <Draggable key={item.id} index={index} draggableId={item.id}>
        {(provided, snapshot) => (
          <div
            className={cx(classes.item, {
              [classes.itemDragging]: snapshot.isDragging,
            })}
            ref={provided.innerRef}
            {...provided.draggableProps}
            onClick={
              status?.status
                ? status.status !== "draft"
                  ? () => {}
                  : () => update(item)
                : () => update(item)
            }
          >
            <div {...provided.dragHandleProps} className={classes.dragHandle}>
              <IconGripVertical size="1.05rem" stroke={1.5} />
            </div>
            <Text>{item.label}</Text>
          </div>
        )}
      </Draggable>
    ))
  ) : (
    <Card withBorder radius="md" padding="md">
      <Center>
        <Text>No items.</Text>
      </Center>
    </Card>
  );

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        dataHandlers.reorder({
          from: source.index,
          to: destination?.index || 0,
        });
      }}
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
