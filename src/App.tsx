/*
 * App.tsx - Todoアプリのメインコンポーネント
 *
 * 【機能・役割】
 * - Todoアプリ全体の画面レイアウトと構造を定義
 * - 各コンポーネント（入力欄、一覧表示）を組み合わせて完成したアプリを作成
 * - データの状態管理とコンポーネント間の連携を担当
 *
 * 【画面構成】
 * 1. タイトル表示
 * 2. Todo追加用の入力フォーム
 * 3. Todo一覧の表示・編集・削除・並び替え機能
 */

// Chakra UIからレイアウト用のBoxとテキスト用のTextをインポート
// Box: div要素のようなコンテナ（レイアウト・スタイリング用）
// Text: 文字表示専用のコンポーネント
// HStack: 横並びレイアウト用コンテナ
import { Box, Text, HStack } from "@chakra-ui/react";

// カラーモード切り替えボタンをインポート
// ColorModeButton: ライト/ダークモード切り替え用ボタン
// useColorModeValue: カラーモードに応じた値選択フック
import { ColorModeButton, useColorModeValue } from "./components/ui/color-mode";

// 子コンポーネントをインポート
// TodoList: Todo一覧の表示・編集・削除・並び替えを担当
import TodoList from "./components/TodoList";
// TodoInput: 新しいTodo追加用の入力フォームを担当
import TodoInput from "./components/TodoInput";

// カスタムフック（独自のロジック）をインポート
// useTodos: Todo一覧の状態管理とlocalStorage連携を担当
import { useTodos } from "./hooks/useTodos";

/**
 * アプリのメインコンポーネント
 *
 * 【処理の流れ】
 * 1. useTodosフックでTodo一覧と操作関数を取得
 * 2. 各コンポーネントに必要なデータと関数をpropsで渡す
 * 3. レイアウトを組み立てて完成したアプリを表示
 */
function App() {
  // useTodosフックでTodo一覧と操作関数を取得
  // todos: 現在のTodo一覧（配列）
  // addTodo: 新しいTodoを追加する関数
  // removeTodo: 指定したTodoを削除する関数
  // moveTodo: Todoの並び順を変更する関数
  // editTodo: Todoの内容を編集する関数
  const { todos, addTodo, removeTodo, moveTodo, editTodo } = useTodos();

  // カラーモードに応じた背景色を設定
  // ライトモード: 白背景、ダークモード: グレー背景
  const bgColor = useColorModeValue("white", "gray.800");
  // カラーモードに応じたテキスト色を設定
  const textColor = useColorModeValue("gray.800", "white");

  return (
    // Boxコンポーネントで全体のレイアウトコンテナを作成
    // ※Boxは<div>のようなもので、Chakra UIのスタイリング機能が使える
    <Box
      maxW="md" // 最大幅を中サイズに制限（スマホ・タブレット対応）
      mx="auto" // 左右を自動マージンで中央寄せ
      mt={4} // 上部に余白を追加（4 = 1rem）
      p={6} // 内側全体に余白を追加（6 = 1.5rem）
      bg={bgColor} // カラーモードに応じた背景色
      color={textColor} // カラーモードに応じたテキスト色
      borderRadius="lg" // 角を丸くして見た目を良くする
      boxShadow="none" // 影なし（シンプルなデザイン）
      border="none" // 枠線なし
      transition="background-color 0.3s ease, color 0.3s ease" // スムーズな色変更
    >
      {/*
        アプリのヘッダー部分
        ※HStackで横並びにして、タイトルとカラーモード切り替えボタンを配置
      */}
      <HStack justify="space-between" align="center" mb={4}>
        {/*
          アプリのタイトル表示
          ※Textコンポーネントは文字表示専用で、フォントサイズや色を簡単に指定できる
        */}
        <Text fontSize="2xl" fontWeight="bold" color="teal.500">
          Todoリスト
        </Text>

        {/*
          カラーモード切り替えボタン
          ※ライトモード/ダークモードの切り替えが可能
        */}
        <ColorModeButton />
      </HStack>

      {/*
        Todo追加用フォーム
        ※onAddプロパティにaddTodo関数を渡すことで、
        　TodoInputで入力された文字をこのコンポーネントに伝える
      */}
      <TodoInput onAdd={addTodo} />

      {/*
        Todo一覧表示エリア
        ※Boxで囲むことで上部に余白を追加し、入力フォームとの間隔を作る
      */}
      <Box mt={4}>
        {/*
          Todo一覧コンポーネント
          ※必要なデータと操作関数をすべてpropsで渡す
          　- todos: 表示するTodo一覧
          　- onRemove: 削除ボタンが押された時の処理
          　- onMove: ドラッグ&ドロップで並び替えされた時の処理
          　- onEdit: 編集ボタンが押された時の処理
        */}
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

// Appコンポーネントをエクスポート（他のファイルから使用可能にする）
// ※このコンポーネントはmain.tsxから呼び出されて画面に表示される
export default App;
