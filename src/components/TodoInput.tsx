import { HStack, Input, Button } from "@chakra-ui/react";
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
    <HStack mb={4}>
      <Input
        placeholder="新しいTodoを入力..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        bg="white"
      />
      <DatePicker
        selected={due}
        onChange={setDue}
        dateFormat="yyyy-MM-dd"
        placeholderText="期日"
        customInput={
          <Button size="sm" variant="outline">
            期日
          </Button>
        }
        popperPlacement="bottom"
        isClearable
        minDate={new Date()}
      />
      {due && (
        <span style={{ color: "#3182ce", fontSize: "0.95em", marginLeft: 4 }}>
          選択中: {due.toISOString().slice(0, 10)}
        </span>
      )}
      <Button colorScheme="teal" onClick={handleAdd}>
        追加
      </Button>
    </HStack>
  );
}
