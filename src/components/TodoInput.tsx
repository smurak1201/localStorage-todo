/*
 * TodoInput.tsx - Todo追加用の入力フォームコンポーネント
 *
 * 【機能・役割】
 * - 新しいTodoアイテムを追加するための入力フォーム
 * - ユーザーからのテキスト入力を受け付け、親コンポーネントに通知
 * - キーボード操作（Enterキー）での追加機能
 *
 * 【UI構成】
 * 1. テキスト入力欄（プレースホルダー付き）
 * 2. 追加ボタン
 * 3. 入力後の自動クリア機能
 */

// Chakra UIのレイアウト・入力・ボタン部品をインポート
// HStack: 横並びレイアウト用コンテナ
// Input: テキスト入力欄
// Button: クリック可能なボタン
// Box: レイアウト調整用のコンテナ
import { HStack, Input, Button, Box } from "@chakra-ui/react";

// カラーモード対応フックをインポート
// useColorModeValue: カラーモードに応じた値選択フック
import { useColorModeValue } from "./ui/color-mode";

// Reactの状態管理フックをインポート
// useState: コンポーネント内でデータの状態（値の変化）を管理する機能
import { useState } from "react";

/**
 * TodoInputコンポーネントのprops型定義
 *
 * 【props説明】
 * - onAdd: 新しいTodoを追加する際に呼ばれる関数
 *   引数としてテキスト（string）を受け取り、戻り値はなし（void）
 */
export type TodoInputProps = {
  onAdd: (text: string) => void; // 新規Todo追加関数
};

/**
 * Todo追加用の入力フォームコンポーネント
 *
 * 【処理の流れ】
 * 1. useStateで入力欄の内容を状態管理
 * 2. 入力内容の変更を監視・更新
 * 3. 追加ボタンクリックまたはEnterキーで追加処理実行
 * 4. 追加後は入力欄を自動クリア
 *
 * 【引数】
 * - onAdd: 親コンポーネント（App）から渡された Todo追加関数
 */
export default function TodoInput({ onAdd }: TodoInputProps) {
  // 入力欄の内容を管理する状態
  // input: 現在の入力内容（文字列）
  // setInput: 入力内容を更新する関数
  const [input, setInput] = useState("");

  // カラーモードに応じた入力欄の背景色を設定
  const inputBg = useColorModeValue("white", "gray.700");

  // 追加ボタン押下時・Enterキー押下時の共通処理
  const handleAdd = () => {
    // 空文字や空白のみの場合は何もしない（バリデーション）
    if (!input.trim()) return;

    // 親コンポーネントに入力内容を渡してTodo追加を依頼
    onAdd(input.trim());

    // 追加完了後、入力欄を空にして次の入力に備える
    setInput("");
  };

  // Enterキー押下時の処理
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enterキーが押された場合
    if (e.key === "Enter") {
      e.preventDefault(); // フォームのデフォルト送信を防ぐ
      handleAdd(); // Todo追加処理を実行
    }
  };

  return (
    // Boxで全体の余白を調整
    // ※mb={4}で下部に余白を追加し、Todo一覧との間隔を作る
    <Box mb={4}>
      {/*
        横並びレイアウトで入力欄とボタンを配置
        ※HStackを使うことで、子要素が自動的に横並びになる
      */}
      <HStack mb={2}>
        {/*
          Todo入力欄
          ※valueとonChangeで「制御されたコンポーネント」として実装
          　これによりReactが入力内容を完全に管理できる
        */}
        <Input
          value={input} // 現在の入力内容を表示
          onChange={(e) => setInput(e.target.value)} // 入力内容変更時にstateを更新
          onKeyDown={handleKeyDown} // キーボード操作（Enter/Escape）を監視
          placeholder="新しいTodoを入力..." // 入力ヒント表示
          size="md" // 中サイズの入力欄
          height="40px" // 高さを明示的に指定
          bg={inputBg} // カラーモードに応じた背景色
          fontSize="16px" // スマホでのズーム防止（16px以上でズームされない）
        />

        {/*
          追加ボタン
          ※入力欄の右側に配置され、クリックでTodo追加処理を実行
        */}
        <Button
          colorScheme="teal" // Chakra UIのテーマカラー（青緑系）
          onClick={handleAdd} // クリック時にTodo追加処理を実行
          size="md" // 中サイズのボタン
          height="40px" // 入力欄と高さを揃える
          minW={16} // 最小幅を指定して見た目を安定させる
        >
          追加
        </Button>
      </HStack>
    </Box>
  );
}
