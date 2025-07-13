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
      <HStack mb={2}>
        {/* Todo入力欄 */}
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="新しいTodoを入力..."
          size="md"
          height="40px"
          bg="white"
        />
        {/* 追加ボタン */}
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
