import { Box, Text } from "@chakra-ui/react";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import { useTodos } from "./hooks/useTodos";
import CalendarWithCount from "./components/CalendarWithCount";
import { useState } from "react";

function App() {
  // 日付ごとにToDoを管理するuseTodos（後でhooksも修正）
  const { todosByDate, addTodo, removeTodo, moveTodo, editTodo } = useTodos();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // yyyy-mm-dd形式
  const dateKey = selectedDate.toISOString().slice(0, 10);
  const todos = todosByDate[dateKey] || [];

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={6}
      bg="white"
      borderRadius="lg"
      boxShadow="none"
      border="none"
    >
      <Text fontSize="2xl" fontWeight="bold" color="teal.500" mb={4}>
        Todoリスト
      </Text>
      <Box mb={4}>
        <CalendarWithCount
          selected={selectedDate}
          onChange={setSelectedDate}
          todosByDate={todosByDate}
        />
      </Box>
      <TodoInput onAdd={(todo) => addTodo(dateKey, todo)} />
      <TodoList
        todos={todos}
        onRemove={(idx) => removeTodo(dateKey, idx)}
        onMove={(from, to) => moveTodo(dateKey, from, to)}
        onEdit={(idx, value) => editTodo(dateKey, idx, value)}
      />
    </Box>
  );
}

export default App;
