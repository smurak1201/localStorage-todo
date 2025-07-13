import { HStack, Text, IconButton, Input, Button } from "@chakra-ui/react";
import { MdDelete, MdDragIndicator, MdEdit } from "react-icons/md";
import type { DraggableProvided } from "@hello-pangea/dnd";
import type { Todo } from "../hooks/useTodos";
import React from "react";

export type TodoItemProps = {
  todo: Todo;
  idx: number;
  editing: boolean;
  editValue: string;
  onEditStart: (idx: number) => void;
  onEditChange: (value: string) => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  onRemove: (idx: number) => void;
  dragProvided: DraggableProvided;
  dragHandleProps: React.HTMLAttributes<HTMLSpanElement>;
};

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
  // 日付選択UI・state削除

  return (
    <HStack
      justify="space-between"
      bg="teal.50"
      p={2}
      borderRadius="md"
      ref={dragProvided.innerRef}
      {...dragProvided.draggableProps}
    >
      <span {...dragHandleProps}>
        <MdDragIndicator
          style={{ cursor: "grab", marginRight: 8, fontSize: 22 }}
        />
      </span>
      {editing ? (
        <>
          <Input
            value={editValue}
            onChange={(e) => onEditChange(e.target.value)}
            size="sm"
            flex={1}
            mr={2}
            fontSize="md"
            placeholder="内容を入力"
          />
          <Button size="sm" colorScheme="teal" mr={1} onClick={onEditSave}>
            保存
          </Button>
          <Button size="sm" variant="ghost" onClick={onEditCancel}>
            キャンセル
          </Button>
        </>
      ) : (
        <>
          <Text flex={1}>
            {todo.text}
            {todo.due &&
              (() => {
                const today = new Date();
                const dueDate = new Date(todo.due);
                // 日付部分のみ比較
                today.setHours(0, 0, 0, 0);
                dueDate.setHours(0, 0, 0, 0);
                const diff = Math.ceil(
                  (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
                );
                let label = "";
                if (diff > 0) label = `あと${diff}日`;
                else if (diff === 0) label = "今日まで";
                else label = "期限切れ";
                return (
                  <span
                    style={{
                      color: "#3182ce",
                      fontSize: "0.9em",
                      marginLeft: 8,
                    }}
                  >
                    {label}
                  </span>
                );
              })()}
          </Text>
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
