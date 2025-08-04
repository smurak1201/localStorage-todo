// Chakra UIからレイアウト用のBoxとテキスト用のTextをインポート
import { Box, Text } from "@chakra-ui/react";
// Todoリスト表示用コンポーネント
import TodoList from "./components/TodoList";
// Todo追加用コンポーネント
import TodoInput from "./components/TodoInput";
// Todoの状態管理用カスタムフック
import { useTodos } from "./hooks/useTodos";

// アプリのメインコンポーネント
function App() {
  // useTodosフックでTodo一覧と操作関数を取得
  const { todos, addTodo, removeTodo, moveTodo, editTodo } = useTodos();

  return (
    // Boxで全体のレイアウトを整える
    <Box
      maxW="md" // 最大幅
      mx="auto" // 中央寄せ
      mt={4} // 上部余白
      p={6} // 内側余白
      bg="white" // 背景色
      borderRadius="lg" // 角丸
      boxShadow="none" // シャドウなし
      border="none" // 枠線なし
    >
      {/* タイトル表示 */}
      <Text fontSize="2xl" fontWeight="bold" color="teal.500" mb={4}>
        Todoリスト
      </Text>
      {/* Todo追加フォーム。onAddで新規Todoを追加 */}
      <TodoInput onAdd={addTodo} />
      {/* Todo一覧表示。各操作関数をpropsで渡す。リスト上部にスペースを追加 */}
      <Box mt={4}>
        <TodoList
          todos={todos}
          onRemove={removeTodo}
          onMove={moveTodo}
          onEdit={editTodo}
        />
      </Box>
    </Box>
  );
}

// Appコンポーネントをエクスポート
export default App;
