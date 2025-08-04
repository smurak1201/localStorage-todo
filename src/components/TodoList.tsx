// ドラッグ＆ドロップ用ライブラリ
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Stack } from "@chakra-ui/react";
import type { DropResult } from "@hello-pangea/dnd";
// 編集状態管理用カスタムフック
import { useEditTodo } from "../hooks/useEditTodo";
// 個々のTodo表示コンポーネント
import TodoItem from "./TodoItem";
// Todo型定義
import type { Todo } from "../types/todo";

// TodoListコンポーネントのprops型
export type TodoListProps = {
  todos: Todo[]; // Todo一覧
  onRemove: (idx: number) => void; // Todo削除
  onMove: (from: number, to: number) => void; // Todo並び替え
  onEdit: (idx: number, value: string) => void; // Todo編集
};

// Todo一覧を表示するコンポーネント
export default function TodoList({
  todos,
  onRemove,
  onMove,
  onEdit,
}: TodoListProps) {
  // 編集状態管理用のカスタムフック
  // useEditTodoの返り値に合わせて変数名を修正
  const { editingIdx, editValue, startEdit, changeEdit, cancelEdit, saveEdit } =
    useEditTodo();

  // ドラッグ＆ドロップで並び替え
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;
    onMove(result.source.index, result.destination.index);
  };

  // 編集開始
  const handleEditStart = (idx: number) => startEdit(idx, todos[idx].text);
  // 編集内容変更
  const handleEditChange = (value: string) => changeEdit(value);
  // 編集保存（onEditを渡す）
  const handleEditSave = () => saveEdit(onEdit);
  // 編集キャンセル
  const handleEditCancel = () => cancelEdit();

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todo-list">
        {(provided) => (
          <Stack ref={provided.innerRef} {...provided.droppableProps} gap={3}>
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
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  );
}
