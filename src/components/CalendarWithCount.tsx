import React from "react";
import { Box, Text, Badge } from "@chakra-ui/react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export type CalendarWithCountProps = {
  selected: Date;
  onChange: (date: Date) => void;
  todosByDate: { [date: string]: string[] };
};

const CalendarWithCount: React.FC<CalendarWithCountProps> = ({
  selected,
  onChange,
  todosByDate,
}) => {
  // カレンダーの日付ごとにTodo件数を表示
  const renderDayContents = (day: number, date?: Date) => {
    if (!date) return day;
    const key = date.toISOString().slice(0, 10);
    const count = todosByDate[key]?.length || 0;
    return (
      <Box position="relative" textAlign="center">
        <span>{day}</span>
        {count > 0 && (
          <Badge
            colorScheme="teal"
            position="absolute"
            top={-1}
            right={-1}
            fontSize="0.7em"
            borderRadius="full"
            px={2}
          >
            {count}
          </Badge>
        )}
      </Box>
    );
  };

  return (
    <DatePicker
      selected={selected}
      onChange={(date) => date && onChange(date)}
      dateFormat="yyyy-MM-dd"
      inline
      renderDayContents={renderDayContents}
    />
  );
};

export default CalendarWithCount;
