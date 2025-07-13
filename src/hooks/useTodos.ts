import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "todosByDate";

export type TodosByDate = {
  [date: string]: string[];
};

export function useTodos() {
  const [todosByDate, setTodosByDate] = useState<TodosByDate>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todosByDate));
  }, [todosByDate]);

  const addTodo = (date: string, todo: string) => {
    setTodosByDate((prev) => ({
      ...prev,
      [date]: [...(prev[date] || []), todo],
    }));
  };

  const removeTodo = (date: string, idx: number) => {
    setTodosByDate((prev) => ({
      ...prev,
      [date]: (prev[date] || []).filter((_, i) => i !== idx),
    }));
  };

  const moveTodo = (date: string, from: number, to: number) => {
    setTodosByDate((prev) => {
      const list = [...(prev[date] || [])];
      const [removed] = list.splice(from, 1);
      list.splice(to, 0, removed);
      return {
        ...prev,
        [date]: list,
      };
    });
  };

  const editTodo = (date: string, idx: number, value: string) => {
    setTodosByDate((prev) => ({
      ...prev,
      [date]: (prev[date] || []).map((todo, i) => (i === idx ? value : todo)),
    }));
  };

  return { todosByDate, addTodo, removeTodo, moveTodo, editTodo };
}
