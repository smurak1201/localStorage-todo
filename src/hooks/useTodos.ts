/*
 * useTodos.ts - Todo一覧の状態管理カスタムフック
 *
 * 【機能・役割】
 * - Todo一覧の状態（追加・削除・編集・並び替え）を管理
 * - localStorageとの連携でデータの永続化を実現
 * - コンポーネントから状態管理ロジックを分離し、再利用性を向上
 *
 * 【提供する機能】
 * 1. Todo一覧の取得・表示
 * 2. 新規Todo追加
 * 3. 既存Todo削除
 * 4. Todo内容編集
 * 5. ドラッグ&ドロップによる並び替え
 * 6. ブラウザリロード後もデータ保持（localStorage）
 */

// Reactの状態管理・副作用フックをインポート
// useState: コンポーネント内でデータの状態を管理
// useEffect: コンポーネントの副作用（外部との連携）を管理
import { useState, useEffect } from "react";

// Todo型定義をインポート
// Todo: 個々のTodoアイテムのデータ構造を定義した型
import type { Todo } from "../types/todo";

// localStorageでデータを保存する際のキー名
// ※この名前でブラウザにデータが保存される
const LOCAL_STORAGE_KEY = "todos";

/**
 * Todo一覧の状態管理カスタムフック
 *
 * 【カスタムフックとは】
 * - Reactの機能を組み合わせて独自の機能を作る仕組み
 * - 複数のコンポーネントで同じロジックを再利用できる
 * - 「use」で始まる名前をつけるのがルール
 *
 * 【戻り値】
 * - todos: 現在のTodo一覧
 * - addTodo: Todo追加関数
 * - removeTodo: Todo削除関数
 * - moveTodo: Todo並び替え関数
 * - editTodo: Todo編集関数
 */
export function useTodos() {
  // Todo一覧の状態管理
  // 初期値としてlocalStorageからデータを読み込む
  const [todos, setTodos] = useState<Todo[]>(() => {
    // アプリ起動時に一度だけ実行される初期化処理
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    // localStorageにデータがあれば読み込み、なければ空配列を返す
    return stored ? (JSON.parse(stored) as Todo[]) : [];
  });

  // todosの内容が変更されるたびlocalStorageへ自動保存
  // ※useEffectの第二引数に[todos]を指定することで、todosが変わった時のみ実行
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

  // 指定されたインデックスのTodoを削除
  const removeTodo = (idx: number) => {
    // filter関数で、指定されたインデックス以外の要素のみを残す
    setTodos(todos.filter((_, i) => i !== idx));
  };

  // Todoの並び順を変更（ドラッグ&ドロップ用）
  const moveTodo = (from: number, to: number) => {
    setTodos((prev) => {
      // 現在の配列をコピーして変更
      const updated = [...prev];
      // fromの位置から要素を1つ取り出し
      const [removed] = updated.splice(from, 1);
      // toの位置に取り出した要素を挿入
      updated.splice(to, 0, removed);
      return updated;
    });
  };

  // 指定されたインデックスのTodo内容を編集
  const editTodo = (idx: number, value: string) => {
    setTodos((prev) =>
      // map関数で配列の各要素を変換
      prev.map((todo, i) =>
        // 対象のインデックスの場合のみテキストを更新、それ以外はそのまま
        i === idx ? { ...todo, text: value } : todo
      )
    );
  };

  // カスタムフックが提供する値・関数を返す
  // ※この戻り値を使って、コンポーネントからTodo操作ができる
  return { todos, addTodo, removeTodo, moveTodo, editTodo };
}
