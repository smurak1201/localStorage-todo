import { HStack, Text, IconButton } from "@chakra-ui/react";
import { MdDelete, MdDragIndicator } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";

export type TodoListProps = {
  todos: string[];
  onRemove: (idx: number) => void;
  onMove: (from: number, to: number) => void;
};

export default function TodoList({ todos, onRemove, onMove }: TodoListProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;
    onMove(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todo-list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {todos.map((todo, idx) => (
              <Draggable key={idx} draggableId={`todo-${idx}`} index={idx}>
                {(dragProvided) => (
                  <HStack
                    justify="space-between"
                    bg="teal.50"
                    p={2}
                    borderRadius="md"
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                  >
                    <span {...dragProvided.dragHandleProps}>
                      <MdDragIndicator
                        style={{ cursor: "grab", marginRight: 8, fontSize: 22 }}
                      />
                    </span>
                    <Text flex={1}>{todo}</Text>
                    <IconButton
                      aria-label="削除"
                      colorScheme="teal"
                      variant="ghost"
                      onClick={() => onRemove(idx)}
                    >
                      <MdDelete />
                    </IconButton>
                  </HStack>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
