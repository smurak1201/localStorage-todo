import { HStack, Input, Button, Box, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export type TodoInputProps = {
  onAdd: (todo: string, due?: string) => void;
};

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [input, setInput] = useState("");
  const [due, setDue] = useState<Date | null>(null);

  const handleAdd = () => {
    if (!input.trim()) return;
    const dueStr = due ? due.toISOString().slice(0, 10) : undefined;
    onAdd(input.trim(), dueStr);
    setInput("");
    setDue(null);
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
      <HStack alignItems="center">
        <DatePicker
          selected={due}
          onChange={setDue}
          dateFormat="yyyy-MM-dd"
          placeholderText="期日"
          customInput={
            <Button
              size="md"
              variant="outline"
              height="40px"
              minW={16}
              colorScheme="teal"
            >
              期日
            </Button>
          }
          popperPlacement="bottom"
          minDate={new Date()}
        />
        {due && (
          <Box
            bg="teal.50"
            color="teal.600"
            fontSize="sm"
            px={3}
            py={1}
            borderRadius="md"
            fontWeight="bold"
            height="40px"
            minW="120px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            whiteSpace="nowrap"
            gap={2}
          >
            <span>
              {due.getFullYear()}年{String(due.getMonth() + 1).padStart(2, "0")}
              月{String(due.getDate()).padStart(2, "0")}日
            </span>
            <IconButton
              aria-label="期日をクリア"
              size="xs"
              variant="ghost"
              colorScheme="teal"
              ml={1}
              onClick={() => setDue(null)}
            >
              ×
            </IconButton>
          </Box>
        )}
      </HStack>
    </Box>
  );
}
