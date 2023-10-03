import { Text, Card, Box, Stack, Title } from "@mantine/core";
import { Droppable } from "react-beautiful-dnd";
import Row from "./Row";

export default function Column({ label, list, id }) {
  return (
    <Box w="20vw">
      <Droppable droppableId={id}>
        {(provided, snapshot) => {
          return (
            <Card
              withBorder
              radius={0}
              padding="xl"
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              <Stack>
                <Title order={3}>{label}</Title>
                {list.map((item, index) => (
                  <Row key={index} index={index} item={item} />
                ))}
              </Stack>
              {provided.placeholder}
            </Card>
          );
        }}
      </Droppable>
    </Box>
  );
}
