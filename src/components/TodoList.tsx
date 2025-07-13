import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { useState } from "react";
import TodoItem from "./TodoItem";
import type { Todo } from "../hooks/useTodos";

export type TodoListProps = {
  todos: Todo[];
  onRemove: (idx: number) => void;
  onMove: (from: number, to: number) => void;
  onEdit: (idx: number, value: string, due?: string) => void;
};

export default function TodoList({
  todos,
  onRemove,
  onMove,
  onEdit,
}: TodoListProps) {
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editDue, setEditDue] = useState<Date | null>(null);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;
    onMove(result.source.index, result.destination.index);
  };

  // 編集開始
  const handleEditStart = (idx: number) => {
    setEditingIdx(idx);
    setEditValue(todos[idx].text);
    setEditDue(todos[idx].due ? new Date(todos[idx].due) : null);
  };
  // 編集内容変更
  const handleEditChange = (value: string) => {
    setEditValue(value);
  };
  // 編集保存
  const handleEditSave = () => {
    if (editingIdx !== null) {
      // 期日も渡す
      const dueStr = editDue ? editDue.toISOString().slice(0, 10) : undefined;
      onEdit(editingIdx, editValue, dueStr);
      setEditingIdx(null);
      setEditDue(null);
    }
  };
  // 編集キャンセル
  const handleEditCancel = () => {
    setEditingIdx(null);
    setEditDue(null);
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
                    editDue={editDue}
                    onEditStart={handleEditStart}
                    onEditChange={handleEditChange}
                    onEditDueChange={setEditDue}
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
