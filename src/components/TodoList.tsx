/*
 * TodoList.tsx - Todo一覧表示・管理コンポーネント
 *
 * 【機能・役割】
 * - Todo一覧の表示とレイアウト管理
 * - ドラッグ&ドロップによる並び替え機能
 * - 各Todoアイテムへの編集機能の提供
 * - 編集状態の統一管理
 *
 * 【UI構成】
 * 1. ドラッグ&ドロップコンテキスト
 * 2. Todo項目のスタック（縦並び）レイアウト
 * 3. 個々のTodoItem コンポーネント
 */

// ドラッグ＆ドロップ用ライブラリからインポート
// DragDropContext: ドラッグ&ドロップ機能全体の制御
// Droppable: ドロップ可能エリアの定義
// Draggable: ドラッグ可能要素の定義
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// Chakra UIのレイアウトコンポーネント
// Stack: 子要素を縦並び（または横並び）に配置し、間隔を調整
import { Stack } from "@chakra-ui/react";

// ドラッグ&ドロップの型定義
// DropResult: ドロップ完了時の結果情報の型
import type { DropResult } from "@hello-pangea/dnd";

// 編集状態管理用カスタムフック
// useEditTodo: どのTodoが編集中かを管理する独自フック
import { useEditTodo } from "../hooks/useEditTodo";

// 個々のTodo表示コンポーネント
// TodoItem: 1つのTodo項目の表示・編集・削除を担当
import TodoItem from "./TodoItem";

// Todo型定義
// Todo: Todoアイテムのデータ構造を定義した型
import type { Todo } from "../types/todo";

/**
 * TodoListコンポーネントのprops型定義
 *
 * 【props説明】
 * - todos: 表示するTodo一覧の配列
 * - onRemove: Todo削除時に呼ばれる関数（引数：削除対象のインデックス）
 * - onMove: Todo並び替え時に呼ばれる関数（引数：移動元・移動先インデックス）
 * - onEdit: Todo編集時に呼ばれる関数（引数：編集対象インデックス・新しいテキスト）
 */
export type TodoListProps = {
  todos: Todo[]; // Todo一覧
  onRemove: (idx: number) => void; // Todo削除
  onMove: (from: number, to: number) => void; // Todo並び替え
  onEdit: (idx: number, value: string) => void; // Todo編集
};

/**
 * Todo一覧を表示・管理するコンポーネント
 *
 * 【処理の流れ】
 * 1. useEditTodoで編集状態を管理
 * 2. ドラッグ&ドロップの並び替え処理を定義
 * 3. 各TodoItemに必要なpropsを渡して描画
 *
 * 【引数】
 * - todos: 表示するTodo一覧
 * - onRemove/onMove/onEdit: 親コンポーネント（App）から受け取った操作関数
 */
export default function TodoList({
  todos,
  onRemove,
  onMove,
  onEdit,
}: TodoListProps) {
  // 編集状態管理用のカスタムフック
  // 複数のTodoが同時に編集されないよう、一つのフックで統一管理
  const { editingIdx, editValue, startEdit, changeEdit, cancelEdit, saveEdit } =
    useEditTodo();

  // ドラッグ＆ドロップで並び替え完了時の処理
  const handleDragEnd = (result: DropResult) => {
    // ドロップ先が無効な場合は何もしない
    if (!result.destination) return;
    // 同じ位置にドロップした場合は何もしない
    if (result.source.index === result.destination.index) return;
    // 親コンポーネントの並び替え関数を呼び出し
    onMove(result.source.index, result.destination.index);
  };

  // 編集開始時の処理（TodoItemから呼ばれる）
  const handleEditStart = (idx: number) => startEdit(idx, todos[idx].text);

  // 編集内容変更時の処理（TodoItemから呼ばれる）
  const handleEditChange = (value: string) => changeEdit(value);

  // 編集保存時の処理（onEditを親コンポーネントの関数に渡す）
  const handleEditSave = () => saveEdit(onEdit);

  // 編集キャンセル時の処理
  const handleEditCancel = () => cancelEdit();

  return (
    // DragDropContext: ドラッグ&ドロップ機能全体を制御するコンテキスト
    // onDragEnd: ドロップ完了時に呼ばれるコールバック関数
    <DragDropContext onDragEnd={handleDragEnd}>
      {/*
        Droppable: ドロップ可能なエリアを定義
        droppableId: このドロップエリアを識別するための一意なID
      */}
      <Droppable droppableId="todo-list">
        {(provided) => (
          /*
            Stack: Todoアイテムを縦並びに配置するコンテナ
            gap={3}: 各アイテム間の間隔を設定
            ref/...provided.droppableProps: ドラッグ&ドロップライブラリが必要とする設定
          */
          <Stack ref={provided.innerRef} {...provided.droppableProps} gap={3}>
            {/* Todo一覧をmap関数で個別のTodoItemに変換 */}
            {todos.map((todo, idx) => (
              /*
                Draggable: ドラッグ可能な要素を定義
                key: Reactが要素を追跡するための一意なキー（todo.idを使用）
                draggableId: ドラッグ&ドロップライブラリが要素を識別するためのID
                index: 配列内での位置（並び替え時に使用）
              */
              <Draggable key={todo.id} draggableId={todo.id} index={idx}>
                {(dragProvided) => (
                  /*
                    TodoItem: 個別のTodo項目を表示するコンポーネント
                    各propsの役割：
                    - todo: 表示するTodoデータ
                    - idx: 配列内でのインデックス
                    - editing: このTodoが編集中かどうか
                    - editValue: 編集中のテキスト内容
                    - onEdit*: 各種編集操作の関数
                    - onRemove: 削除操作の関数
                    - dragProvided: ドラッグ&ドロップに必要な設定
                  */
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
            {/*
              placeholder: ドラッグ中に空いたスペースを埋めるためのプレースホルダー
              ※ドラッグ&ドロップライブラリが自動で管理
            */}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  );
}
