import { VStack, HStack, Text, IconButton } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

export type TodoListProps = {
  todos: string[];
  onRemove: (idx: number) => void;
};

export default function TodoList({ todos, onRemove }: TodoListProps) {
  return (
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
            onClick={() => onRemove(idx)}
          >
            <MdDelete />
          </IconButton>
        </HStack>
      ))}
    </VStack>
  );
}
