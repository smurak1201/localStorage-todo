import { useState, useEffect } from "react";
import {
  Input,
  Button,
  VStack,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

const LOCAL_STORAGE_KEY = "todos";

function App() {
  const [todos, setTodos] = useState<string[]>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) {
      return;
    }
    setTodos([...todos, input.trim()]);
    setInput("");
  };

  const removeTodo = (idx: number) => {
    setTodos(todos.filter((_, i) => i !== idx));
  };

  return (
    <div style={{ maxWidth: "28rem", margin: "40px auto 0", padding: "24px" }}>
      <Text fontSize="2xl" fontWeight="bold" color="teal.500" mb={4}>
        Todoリスト
      </Text>
      <HStack mb={4}>
        <Input
          placeholder="新しいTodoを入力..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          bg="white"
        />
        <Button colorScheme="teal" onClick={addTodo}>
          追加
        </Button>
      </HStack>
      <VStack gap={3} align="stretch">
        {todos.map((todo, idx) => (
          <HStack
            key={idx}
            justify="space-between"
            bg="teal.50"
            p={2}
            borderRadius="md"
          >
            <Text>{todo}</Text>
            <IconButton
              aria-label="削除"
              colorScheme="teal"
              variant="ghost"
              onClick={() => removeTodo(idx)}
            >
              <MdDelete />
            </IconButton>
          </HStack>
        ))}
      </VStack>
    </div>
  );
}

export default App;
