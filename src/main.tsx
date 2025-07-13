// グローバルなUI設定用Providerをインポート
import { Provider } from "./components/ui/provider";
// React本体
import React from "react";
// ReactのDOM描画用ライブラリ
import ReactDOM from "react-dom/client";

// アプリのメインコンポーネント
import App from "./App";

// アプリの描画処理
ReactDOM.createRoot(document.getElementById("root")!).render(
  // 厳格モードでラップ（開発時の警告強化）
  <React.StrictMode>
    {/* UI全体のProviderでラップ */}
    <Provider>
      {/* Todoアプリ本体 */}
      <App />
    </Provider>
  </React.StrictMode>
);
