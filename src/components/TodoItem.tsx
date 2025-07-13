import { HStack, Text, IconButton, Input, Button } from "@chakra-ui/react";
import { MdDelete, MdDragIndicator, MdEdit } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import type { DraggableProvided } from "@hello-pangea/dnd";
import React from "react";

export type TodoItemProps = {
  todo: string;
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
  // 日付選択用state（Input値が日付形式ならDate型に変換）
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    editing && !isNaN(Date.parse(editValue)) ? new Date(editValue) : null
  );

  // DatePickerで日付選択時にInputへ反映
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      onEditChange(date.toISOString().slice(0, 10)); // yyyy-mm-dd形式
    }
  };

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
            fontSize="md" // 16px以上でスマホズーム防止
            placeholder="内容または日付を入力"
          />
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="日付選択"
            customInput={
              <Button size="sm" variant="outline" mr={2}>
                📅
              </Button>
            }
            popperPlacement="bottom"
            isClearable
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
          <Text flex={1}>{todo}</Text>
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
