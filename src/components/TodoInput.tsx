import { HStack, Input, Button } from "@chakra-ui/react";
import { useState } from "react";

export type TodoInputProps = {
  onAdd: (todo: string) => void;
};

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    onAdd(input.trim());
    setInput("");
  };

  return (
    <HStack mb={4}>
      <Input
        placeholder="新しいTodoを入力..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        bg="white"
      />
      <Button colorScheme="teal" onClick={handleAdd}>
        追加
      </Button>
    </HStack>
  );
}
