// Chakra UIのレイアウト・UI部品をインポート
import { HStack, Text, IconButton, Input, Button } from "@chakra-ui/react";
// アイコン用ライブラリ
import { MdDelete, MdDragIndicator, MdEdit } from "react-icons/md";
// ドラッグ＆ドロップ用型定義
import type { DraggableProvided } from "@hello-pangea/dnd";
// Todo型定義
import type { Todo } from "../types/todo";
// Reactの型定義をインポート
import React from "react";

// TodoItemコンポーネントのprops型
export type TodoItemProps = {
  todo: Todo; // 表示するTodo
  idx: number; // Todoの並び順
  editing: boolean; // 編集中かどうか
  editValue: string; // 編集中のテキスト
  onEditStart: (idx: number) => void; // 編集開始
  onEditChange: (value: string) => void; // 編集テキスト変更
  onEditSave: () => void; // 編集確定
  onEditCancel: () => void; // 編集キャンセル
  onRemove: (idx: number) => void; // Todo削除
  dragProvided: DraggableProvided; // ドラッグ操作用
  dragHandleProps: React.HTMLAttributes<HTMLSpanElement>; // ドラッグハンドル用
};

// 個々のTodoを表示・操作するコンポーネント
const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  idx,
  editing,
  editValue,
  onEditStart,
  onEditChange,
  onEditSave,
  onEditCancel,
  onRemove,
  dragProvided,
  dragHandleProps,
}) => {
  return (
    // HStackで横並びレイアウト
    <HStack
      justify="space-between"
      bg="teal.50"
      p={2}
      borderRadius="md"
      ref={dragProvided.innerRef}
      {...dragProvided.draggableProps}
      // ドラッグ中の視覚的フィードバック
      _hover={{ bg: "teal.100", transform: "scale(1.02)" }}
      _active={{ bg: "teal.200", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
      transition="background-color 0.2s ease, box-shadow 0.2s ease"
      cursor="grab"
      _focusWithin={{ cursor: "grab" }}
    >
      {/* ドラッグハンドル（並び替え用） */}
      <span {...dragHandleProps}>
        <MdDragIndicator
          style={{ cursor: "grab", marginRight: 8, fontSize: 22 }}
        />
      </span>
      {editing ? (
        // 編集モード時の表示
        <>
          {/* 編集用入力欄 */}
          <Input
            value={editValue}
            onChange={(e) => onEditChange(e.target.value)}
            size="sm"
            flex={1}
            mr={2}
            fontSize="16px" // スマホ拡大防止
            placeholder="内容を入力"
          />
          {/* 保存ボタン */}
          <Button
            size="sm"
            colorScheme="teal"
            mr={1}
            onClick={() => {
              if (editValue.trim() !== "") {
                onEditSave();
              }
            }}
            disabled={editValue.trim() === ""}
          >
            保存
          </Button>
          {/* キャンセルボタン */}
          <Button size="sm" variant="ghost" onClick={onEditCancel}>
            キャンセル
          </Button>
        </>
      ) : (
        // 通常表示モード
        <>
          {/* Todo内容表示（ドラッグ可能） */}
          <Text
            flex={1}
            {...dragHandleProps}
            cursor="grab"
            _active={{ cursor: "grabbing" }}
            userSelect="none"
          >
            {todo.text}
          </Text>
          {/* 編集ボタン */}
          <IconButton
            aria-label="編集"
            colorScheme="teal"
            variant="ghost"
            size="sm"
            onClick={() => onEditStart(idx)}
            mr={1}
          >
            <MdEdit />
          </IconButton>
          {/* 削除ボタン */}
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
  );
};

export default TodoItem;
