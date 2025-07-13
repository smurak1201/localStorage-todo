import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { useState } from "react";
import TodoItem from "./TodoItem";
import type { Todo } from "../hooks/useTodos";

export type TodoListProps = {
  todos: Todo[];
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

  // 編集開始
  const handleEditStart = (idx: number) => {
    setEditingIdx(idx);
    setEditValue(todos[idx].text);
  };
  // 編集内容変更
  const handleEditChange = (value: string) => {
    setEditValue(value);
  };
  // 編集保存
  const handleEditSave = () => {
    if (editingIdx !== null) {
      onEdit(editingIdx, editValue);
      setEditingIdx(null);
    }
  };
  // 編集キャンセル
  const handleEditCancel = () => {
    setEditingIdx(null);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todo-list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {todos.map((todo, idx) => (
              <Draggable key={idx} draggableId={`todo-${idx}`} index={idx}>
                {(dragProvided) => (
                  <TodoItem
                    todo={todo}
                    idx={idx}
                    editing={editingIdx === idx}
                    editValue={editValue}
                    onEditStart={handleEditStart}
                    onEditChange={handleEditChange}
                    onEditSave={handleEditSave}
                    onEditCancel={handleEditCancel}
                    onRemove={onRemove}
                    dragProvided={dragProvided}
                    dragHandleProps={dragProvided.dragHandleProps ?? {}}
                  />
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
