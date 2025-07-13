import { HStack, Text, IconButton, Input, Button } from "@chakra-ui/react";
import { MdDelete, MdDragIndicator } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { useState } from "react";

export type TodoListProps = {
  todos: string[];
  onRemove: (idx: number) => void;
  onMove: (from: number, to: number) => void;
  onEdit: (idx: number, value: string) => void;
};

export default function TodoList({
  todos,
  onRemove,
  onMove,
  onEdit,
}: TodoListProps) {
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
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
                    {editingIdx === idx ? (
                      <>
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          size="sm"
                          flex={1}
                          mr={2}
                        />
                        <Button
                          size="sm"
                          colorScheme="teal"
                          mr={1}
                          onClick={() => {
                            onEdit(idx, editValue);
                            setEditingIdx(null);
                          }}
                        >
                          保存
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingIdx(null)}
                        >
                          キャンセル
                        </Button>
                      </>
                    ) : (
                      <>
                        <Text flex={1}>{todo}</Text>
                        <IconButton
                          aria-label="編集"
                          colorScheme="teal"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingIdx(idx);
                            setEditValue(todo);
                          }}
                          mr={1}
                        >
                          <span style={{ fontWeight: "bold" }}>✏️</span>
                        </IconButton>
                        <IconButton
                          aria-label="削除"
                          colorScheme="teal"
                          variant="ghost"
                          onClick={() => onRemove(idx)}
                        >
                          <MdDelete />
                        </IconButton>
                      </>
                    )}
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
