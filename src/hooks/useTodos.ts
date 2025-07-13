import { useState, useEffect } from "react";
import type { Todo } from "../types/todo";

const LOCAL_STORAGE_KEY = "todos";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Todo[]) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    setTodos([...todos, { text }]);
  };

  const removeTodo = (idx: number) => {
    setTodos(todos.filter((_, i) => i !== idx));
  };

  const moveTodo = (from: number, to: number) => {
    setTodos((prev) => {
      const updated = [...prev];
      const [removed] = updated.splice(from, 1);
      updated.splice(to, 0, removed);
      return updated;
    });
  };

  const editTodo = (idx: number, value: string) => {
    setTodos((prev) => prev.map((todo, i) => (i === idx ? { ...todo, text: value } : todo)));
  };

  return { todos, addTodo, removeTodo, moveTodo, editTodo };
}
