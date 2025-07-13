import { Box, Text } from "@chakra-ui/react";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import { useTodos } from "./hooks/useTodos";

function App() {
  const { todos, addTodo, removeTodo, moveTodo, editTodo } = useTodos();

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
      <TodoInput onAdd={addTodo} />
      <TodoList
        todos={todos}
        onRemove={removeTodo}
        onMove={moveTodo}
        onEdit={editTodo}
      />
    </Box>
  );
}

export default App;
