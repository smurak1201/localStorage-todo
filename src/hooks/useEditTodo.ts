import { useState } from "react";

export function useEditTodo() {
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const startEdit = (idx: number, value: string) => {
    setEditingIdx(idx);
    setEditValue(value);
  };
  const changeEdit = (value: string) => setEditValue(value);
  const cancelEdit = () => {
    setEditingIdx(null);
    setEditValue("");
  };
  const saveEdit = (onEdit: (idx: number, value: string) => void) => {
    if (editingIdx !== null) {
      onEdit(editingIdx, editValue);
      setEditingIdx(null);
      setEditValue("");
    }
  };

  return {
    editingIdx,
    editValue,
    startEdit,
    changeEdit,
    cancelEdit,
    saveEdit,
  };
}
