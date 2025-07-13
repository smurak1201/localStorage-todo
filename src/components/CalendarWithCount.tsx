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
    // タイムゾーンずれ防止: ローカル日付でkey生成
    const pad = (n: number) => n.toString().padStart(2, "0");
    const key = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}`;
    const count = todosByDate[key]?.length || 0;
    return (
      <Box
        textAlign="center"
        minW={7}
        minH={7}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="40px"
        position="relative"
      >
        <span
          style={{
            lineHeight: "1",
            fontSize: "1em",
            marginBottom: count > 0 ? 2 : 0,
          }}
        >
          {day}
        </span>
        {count > 0 && (
          <Box
            fontSize="xs"
            color="teal.600"
            fontWeight="bold"
            borderRadius="md"
            px={1}
            bg="teal.50"
            lineHeight="1"
            mt={0.5}
            style={{ marginTop: "2px" }}
          >
            {count}件
          </Box>
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
