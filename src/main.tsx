/*
 * main.tsx - アプリケーションのエントリーポイント
 *
 * 【機能・役割】
 * - Reactアプリを実際のHTML要素（DOM）に描画する起点
 * - アプリ全体を囲むProvider（設定・テーマなど）の設定
 * - 開発時の厳格モード（StrictMode）の有効化
 *
 * 【処理の流れ】
 * 1. HTML内の"root"要素を取得
 * 2. Reactの描画エンジンを初期化
 * 3. Provider群でアプリ全体をラップ
 * 4. Appコンポーネントを描画開始
 */

// Chakra UI全体の設定・テーマProvider
// Provider: アプリ全体でChakra UIの機能を使えるようにする
import { Provider } from "./components/ui/provider";

// React本体のライブラリ
// React: コンポーネント作成・状態管理の核となる機能
import React from "react";

// ReactのDOM操作用ライブラリ
// ReactDOM: Reactコンポーネントを実際のHTML要素に描画する機能
import ReactDOM from "react-dom/client";

// アプリのメインコンポーネント
// App: Todoアプリ全体の画面とロジックを統合したコンポーネント
import App from "./App";

/**
 * アプリケーションの描画処理（実行部分）
 *
 * 【実行される処理】
 * 1. HTML内のid="root"の要素を取得し、React描画の起点とする
 * 2. StrictModeで開発時の警告・チェックを強化
 * 3. ProviderでChakra UIの機能をアプリ全体で使用可能にする
 * 4. Appコンポーネントを描画してTodoアプリを開始
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  // 厳格モード：開発時に潜在的な問題を検出・警告する仕組み
  // ※本番ビルドでは自動的に無効化される
  <React.StrictMode>
    {/*
      Chakra UIのProvider：アプリ全体でテーマ・スタイルを統一
      ※このProviderがないとChakra UIコンポーネントが正常に動作しない
    */}
    <Provider>
      {/*
        Todoアプリ本体のコンポーネント
        ※ここからApp.tsx → TodoInput.tsx、TodoList.tsxと順次描画される
      */}
      <App />
    </Provider>
  </React.StrictMode>
);
