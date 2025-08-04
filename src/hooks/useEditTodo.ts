/*
 * useEditTodo.ts - Todo編集状態管理カスタムフック
 *
 * 【機能・役割】
 * - どのTodoが編集中かの状態管理
 * - 編集中のテキスト内容の管理
 * - 編集開始・変更・保存・キャンセルの操作を提供
 *
 * 【なぜ分離するのか】
 * - useTodosフックが複雑になりすぎるのを防ぐ
 * - 編集機能だけを独立してテスト・再利用可能
 * - 関心の分離：データ管理と編集状態管理を分ける
 */

// Reactの状態管理フックをインポート
// useState: 編集状態（どのTodoを編集中か、編集内容は何か）を管理
import { useState } from "react";

/**
 * Todo編集状態管理カスタムフック
 *
 * 【管理する状態】
 * - editingIdx: 現在編集中のTodoのインデックス（nullなら編集中でない）
 * - editValue: 編集中のテキスト内容
 *
 * 【提供する操作】
 * - startEdit: 編集開始
 * - changeEdit: 編集内容変更
 * - saveEdit: 編集内容保存
 * - cancelEdit: 編集キャンセル
 */
export function useEditTodo() {
  // 編集中のTodoのインデックス（nullの場合は編集中でない）
  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  // 編集中のテキスト内容
  const [editValue, setEditValue] = useState("");

  // 編集開始時の処理
  const startEdit = (idx: number, value: string) => {
    setEditingIdx(idx); // 編集対象のインデックスを設定
    setEditValue(value); // 現在のTodo内容を編集用の状態にコピー
  };

  // 編集内容変更時の処理
  const changeEdit = (value: string) => setEditValue(value);

  // 編集キャンセル時の処理
  const cancelEdit = () => {
    setEditingIdx(null); // 編集状態を解除
    setEditValue(""); // 編集内容をクリア
  };

  // 編集保存時の処理（onEditを呼び出してTodoを更新）
  const saveEdit = (onEdit: (idx: number, value: string) => void) => {
    if (editingIdx !== null) {
      onEdit(editingIdx, editValue); // 親コンポーネントの編集関数を呼び出し
      setEditingIdx(null); // 編集状態を解除
      setEditValue(""); // 編集内容をクリア
    }
  };

  // 編集状態・操作関数を返す
  return {
    editingIdx, // 現在編集中のTodoインデックス
    editValue, // 編集中のテキスト
    startEdit, // 編集開始関数
    changeEdit, // 編集内容変更関数
    cancelEdit, // 編集キャンセル関数
    saveEdit, // 編集保存関数
  };
}
