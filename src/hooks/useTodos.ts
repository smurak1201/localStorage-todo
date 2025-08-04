// Reactの状態管理・副作用フックをインポート
import { useState, useEffect } from "react";
// Todo型定義をインポート
import type { Todo } from "../types/todo";

// localStorageのキー名
const LOCAL_STORAGE_KEY = "todos";

export function useTodos() {
  // Todo一覧の状態管理
  const [todos, setTodos] = useState<Todo[]>(() => {
    // 初回のみlocalStorageからデータ取得
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Todo[]) : [];
  });

  // todosが変更されるたびlocalStorageへ保存
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // 新しいTodoを追加
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: `todo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
    };
    setTodos([...todos, newTodo]);
  };

  // Todoを削除
  const removeTodo = (idx: number) => {
    setTodos(todos.filter((_, i) => i !== idx));
  };

  // Todoの並び順を変更
  const moveTodo = (from: number, to: number) => {
    setTodos((prev) => {
      const updated = [...prev];
      const [removed] = updated.splice(from, 1);
      updated.splice(to, 0, removed);
      return updated;
    });
  };

  // Todoの内容を編集
  const editTodo = (idx: number, value: string) => {
    setTodos((prev) => prev.map((todo, i) => (i === idx ? { ...todo, text: value } : todo)));
  };

  // 必要な値・関数を返す
  return { todos, addTodo, removeTodo, moveTodo, editTodo };
}
