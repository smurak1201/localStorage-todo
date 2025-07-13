import { HStack, Input, Button, Box } from "@chakra-ui/react";
import { useState } from "react";

export type TodoInputProps = {
  onAdd: (text: string) => void;
};

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    onAdd(input.trim());
    setInput("");
  };

  return (
    <Box mb={4}>
      <HStack alignItems="center" mb={2}>
        <Input
          placeholder="新しいTodoを入力..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          bg="white"
          size="md"
          height="40px"
        />
        <Button
          colorScheme="teal"
          onClick={handleAdd}
          size="md"
          height="40px"
          minW={16}
        >
          追加
        </Button>
      </HStack>
    </Box>
  );
}
