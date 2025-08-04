// Reactの状態管理フックをインポート
import { useState } from "react";

export function useEditTodo() {
  // 編集中のTodoのインデックス
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  // 編集中のテキスト
  const [editValue, setEditValue] = useState("");

  // 編集開始時の処理
  const startEdit = (idx: number, value: string) => {
    setEditingIdx(idx);
    setEditValue(value);
  };

  // 編集内容変更時の処理
  const changeEdit = (value: string) => setEditValue(value);

  // 編集キャンセル時の処理
  const cancelEdit = () => {
    setEditingIdx(null);
    setEditValue("");
  };

  // 編集保存時の処理（onEditを呼び出してTodoを更新）
  const saveEdit = (onEdit: (idx: number, value: string) => void) => {
    if (editingIdx !== null) {
      onEdit(editingIdx, editValue);
      setEditingIdx(null);
      setEditValue("");
    }
  };

  // 編集状態・操作関数を返す
  return {
    editingIdx,
    editValue,
    startEdit,
    changeEdit,
    cancelEdit,
    saveEdit,
  };
}
