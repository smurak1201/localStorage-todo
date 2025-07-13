// Chakra UIのレイアウト・入力・ボタン部品をインポート
import { HStack, Input, Button, Box } from "@chakra-ui/react";
// Reactの状態管理フックをインポート
import { useState } from "react";

// TodoInputコンポーネントのprops型
export type TodoInputProps = {
  onAdd: (text: string) => void; // 新規Todo追加関数
};

export default function TodoInput({ onAdd }: TodoInputProps) {
  // 入力欄の状態管理
  const [input, setInput] = useState("");

  // 追加ボタン押下時の処理
  const handleAdd = () => {
    if (!input.trim()) return; // 空文字は追加しない
    onAdd(input.trim()); // Todo追加
    setInput(""); // 入力欄をクリア
  };

  return (
    // Boxで全体の余白を調整
    <Box mb={4}>
      {/* 横並びレイアウトで入力欄とボタンを配置 */}
      <HStack mb={2}>
        {/* Todo入力欄 */}
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="新しいTodoを入力..."
          size="md"
          height="40px"
          bg="white"
          fontSize="16px" // スマホ拡大防止
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
