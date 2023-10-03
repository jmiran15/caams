import { Text, Card, Badge, Group } from "@mantine/core";
import { Draggable } from "react-beautiful-dnd";

export default function Row({ item, index }) {
  return (
    <Draggable draggableId={`${item.id}`} key={item.id} index={index}>
      {(provided, snapshot) => (
        <Card
          w="100%"
          withBorder
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          padding="md"
          radius="md"
        >
          <Text fw={500} mb={7} sx={{ lineHeight: 1 }}>
            {item.expand.user.firstName} {item.expand.user.lastName}
          </Text>
          <Text fz="sm" c="dimmed">
            {item.expand.user.email}
          </Text>
          <Text fz="sm" c="dimmed">
            {item.expand.user.location}
          </Text>
          <Group spacing={7} mt={5}>
            {item.expand.user.skills.slice(0, 4).map((skill) => (
              <Badge color="gray" key={skill}>
                {skill}
              </Badge>
            ))}
          </Group>
          {provided.placeholder}
        </Card>
      )}
    </Draggable>
  );
}
