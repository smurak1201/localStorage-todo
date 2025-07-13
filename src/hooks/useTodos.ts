import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "todos";

export function useTodos() {
  const [todos, setTodos] = useState<string[]>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: string) => {
    setTodos([...todos, todo]);
  };

  const removeTodo = (idx: number) => {
    setTodos(todos.filter((_, i) => i !== idx));
  };

  return { todos, addTodo, removeTodo };
}
