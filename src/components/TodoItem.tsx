/*
 * TodoItem.tsx - 個別Todo項目表示・操作コンポーネント
 *
 * 【機能・役割】
 * - 1つのTodoアイテムの表示・編集・削除機能
 * - ドラッグ&ドロップによる並び替えのサポート
 * - 編集モードと表示モードの切り替え
 * - キーボード操作（Enter/Escape）での編集機能
 *
 * 【UI構成】
 * 1. ドラッグハンドル（並び替え用アイコン）
 * 2. Todo内容表示エリア（編集モード時は入力欄）
 * 3. 操作ボタン群（編集・削除 または 保存・キャンセル）
 */

// Chakra UIのレイアウト・UI部品をインポート
// HStack: 横並びレイアウト用コンテナ
// Text: 文字表示専用コンポーネント
// IconButton: アイコン付きボタン
// Input: テキスト入力欄
// Button: 通常のボタン
import { HStack, Text, IconButton, Input, Button } from "@chakra-ui/react";

// Material Designアイコンライブラリからインポート
// MdDelete: 削除アイコン（ゴミ箱）
// MdDragIndicator: ドラッグハンドルアイコン（並び替え用）
// MdEdit: 編集アイコン（鉛筆）
import { MdDelete, MdDragIndicator, MdEdit } from "react-icons/md";

// ドラッグ＆ドロップ用型定義
// DraggableProvided: ドラッグ可能要素に必要な設定・関数を提供する型
import type { DraggableProvided } from "@hello-pangea/dnd";

// Todo型定義
// Todo: Todoアイテムのデータ構造を定義した型
import type { Todo } from "../types/todo";

// カラーモード対応フックをインポート
// useColorModeValue: カラーモードに応じた値選択フック
import { useColorModeValue } from "./ui/color-mode";

// Reactの型定義をインポート
// React: JSX要素の型定義に必要
import React from "react";

/**
 * TodoItemコンポーネントのprops型定義
 *
 * 【props説明】
 * - todo: 表示するTodoデータ（id, text）
 * - idx: 配列内でのインデックス（削除・編集時の識別に使用）
 * - editing: このTodoが編集中かどうかの真偽値
 * - editValue: 編集中のテキスト内容
 * - onEdit*: 各種編集操作時に呼ばれる関数群
 * - onRemove: 削除ボタンクリック時に呼ばれる関数
 * - dragProvided: ドラッグ&ドロップライブラリからの設定
 * - dragHandleProps: ドラッグハンドル要素に適用する属性
 */
export type TodoItemProps = {
  todo: Todo; // 表示するTodo
  idx: number; // Todoの並び順
  editing: boolean; // 編集中かどうか
  editValue: string; // 編集中のテキスト
  onEditStart: (idx: number) => void; // 編集開始
  onEditChange: (value: string) => void; // 編集テキスト変更
  onEditSave: () => void; // 編集確定
  onEditCancel: () => void; // 編集キャンセル
  onRemove: (idx: number) => void; // Todo削除
  dragProvided: DraggableProvided; // ドラッグ操作用
  dragHandleProps: React.HTMLAttributes<HTMLSpanElement>; // ドラッグハンドル用
};

/**
 * 個々のTodoを表示・操作するコンポーネント
 *
 * 【処理の流れ】
 * 1. editingプロパティに応じて表示モード・編集モードを切り替え
 * 2. ドラッグ&ドロップのための属性を適用
 * 3. 各操作ボタンのクリックイベントを親コンポーネントに通知
 *
 * 【引数】
 * - 表示データ（todo, idx）
 * - 編集状態（editing, editValue）
 * - 操作関数群（onEdit*, onRemove）
 * - ドラッグ&ドロップ設定（dragProvided, dragHandleProps）
 */
const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  idx,
  editing,
  editValue,
  onEditStart,
  onEditChange,
  onEditSave,
  onEditCancel,
  onRemove,
  dragProvided,
  dragHandleProps,
}) => {
  // カラーモードに応じた背景色を設定
  const itemBg = useColorModeValue("teal.50", "gray.700");
  const itemHoverBg = useColorModeValue("teal.100", "gray.600");
  const itemActiveBg = useColorModeValue("teal.200", "gray.500");
  return (
    // HStackで横並びレイアウトを構築
    // ※justify="space-between"で左端と右端に要素を配置
    <HStack
      justify="space-between" // 要素を両端に配置
      bg={itemBg} // カラーモードに応じた背景色
      p={2} // 内側の余白
      borderRadius="md" // 中程度の角丸
      ref={dragProvided.innerRef} // ドラッグ&ドロップライブラリが要求するref
      {...dragProvided.draggableProps} // ドラッグ&ドロップに必要な属性を展開
      // 視覚的フィードバック（ユーザビリティ向上）
      _hover={{ bg: itemHoverBg, transform: "scale(1.02)" }} // マウスホバー時のスタイル
      _active={{ bg: itemActiveBg, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }} // クリック時のスタイル
      transition="background-color 0.2s ease, box-shadow 0.2s ease" // スムーズなアニメーション
      cursor="grab" // 掴めることを示すカーソル
      _focusWithin={{ cursor: "grab" }} // フォーカス内でもgrabカーソル
    >
      {/*
        ドラッグハンドル（並び替え用アイコン）
        ※このアイコンをドラッグすることで並び替えが可能
      */}
      <span {...dragHandleProps}>
        <MdDragIndicator
          style={{ cursor: "grab", marginRight: 8, fontSize: 22 }}
        />
      </span>

      {/* 編集モードと表示モードを条件分岐で切り替え */}
      {editing ? (
        // 編集モード時の表示
        <>
          {/*
            編集用入力欄
            ※制御されたコンポーネントとして実装（valueとonChangeをセット）
            ※キーボードショートカット（Enter/Escape）をサポート
          */}
          <Input
            value={editValue} // 現在の編集内容を表示
            onChange={(e) => onEditChange(e.target.value)} // 入力内容変更時の処理
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // デフォルト動作を防ぐ
                if (editValue.trim() !== "") {
                  onEditSave(); // Enterキーで保存
                }
              } else if (e.key === "Escape") {
                e.preventDefault();
                onEditCancel(); // Escapeキーでキャンセル
              }
            }}
            size="sm" // 小サイズの入力欄
            flex={1} // 残り幅を最大限使用
            mr={2} // 右側にマージン
            fontSize="16px" // スマホでのズーム防止
            placeholder="内容を入力" // 入力ヒント
          />

          {/* 保存ボタン */}
          <Button
            size="sm" // 小サイズ
            colorScheme="teal" // テーマカラー
            mr={1} // 右マージン
            onClick={() => {
              // 空文字でない場合のみ保存
              if (editValue.trim() !== "") {
                onEditSave();
              }
            }}
            disabled={editValue.trim() === ""} // 空文字の場合は無効化
          >
            保存
          </Button>

          {/* キャンセルボタン */}
          <Button size="sm" variant="ghost" onClick={onEditCancel}>
            キャンセル
          </Button>
        </>
      ) : (
        // 通常表示モード
        <>
          {/*
            Todo内容表示（ドラッグ可能）
            ※テキスト部分もドラッグハンドルとして機能
          */}
          <Text
            flex={1} // 残り幅を最大限使用
            {...dragHandleProps} // ドラッグハンドル属性を適用
            cursor="grab" // 掴めることを示すカーソル
            _active={{ cursor: "grabbing" }} // ドラッグ中のカーソル
            userSelect="none" // テキスト選択を無効化（ドラッグ操作の邪魔を防ぐ）
          >
            {todo.text}
          </Text>

          {/* 編集ボタン */}
          <IconButton
            aria-label="編集" // アクセシビリティ用のラベル
            colorScheme="teal" // テーマカラー
            variant="ghost" // 透明背景バリエーション
            size="sm" // 小サイズ
            onClick={() => onEditStart(idx)} // クリック時に編集モードを開始
            mr={1} // 右マージン
          >
            <MdEdit />
          </IconButton>

          {/* 削除ボタン */}
          <IconButton
            aria-label="削除" // アクセシビリティ用のラベル
            colorScheme="teal" // テーマカラー
            variant="ghost" // 透明背景バリエーション
            onClick={() => onRemove(idx)} // クリック時に削除処理を実行
          >
            <MdDelete />
          </IconButton>
        </>
      )}
    </HStack>
  );
};

// コンポーネントをエクスポート（他のファイルから使用可能にする）
export default TodoItem;
