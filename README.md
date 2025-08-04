# localstrage-todo

## 概要

React + TypeScript の基本を学習するためのシンプルな Todo リストアプリです。
Chakra UI でスタイリング、localStorage でデータ永続化、ドラッグ&ドロップによる並び替え機能を実装しています。

このプロジェクトは GitHub Copilot を活用して開発されており、AI ペアプログラミングの実践例としても参考にしていただけます。

**学習目標**

- React の基本設計パターンの理解
- TypeScript による型安全な開発手法
- コンポーネント指向の設計思想
- カスタムフックによる状態管理
- ファイル分割による保守性の向上

---

## 主な技術・構成

- **言語**: TypeScript, JavaScript
- **フレームワーク**: React 18
- **ビルドツール**: Vite
- **UI ライブラリ**: Chakra UI v3
- **状態管理**: React Hooks（useState, useEffect, カスタムフック）
- **ドラッグ&ドロップ**: @hello-pangea/dnd
- **データ永続化**: localStorage（ブラウザ内データ保存）
- **型定義**: TypeScript（コンパイル時エラー検出）

---

## ディレクトリ構成とファイル分割の考え方

### **基本構成**

```
src/
├── main.tsx                 # アプリのエントリーポイント
├── App.tsx                  # メインコンポーネント（全体統合）
├── components/              # UIコンポーネント（表示・操作）
│   ├── TodoInput.tsx        # Todo追加フォーム
│   ├── TodoList.tsx         # Todo一覧表示
│   ├── TodoItem.tsx         # 個別Todo項目
│   └── ui/                  # Chakra UI設定
├── hooks/                   # カスタムフック（ロジック）
│   ├── useTodos.ts          # Todo操作・状態管理
│   └── useEditTodo.ts       # 編集状態管理
└── types/                   # 型定義（データ構造）
    └── todo.ts              # Todo型定義
```

### **ファイル分割の設計思想**

#### 1. **関心の分離（Separation of Concerns）**

- **UI コンポーネント** (`components/`) → 「見た目と操作」
- **ビジネスロジック** (`hooks/`) → 「データ処理と状態管理」
- **型定義** (`types/`) → 「データ構造の定義」

#### 2. **単一責任の原則（Single Responsibility Principle）**

- **TodoInput** → Todo 追加のみ
- **TodoList** → 一覧表示と並び替えのみ
- **TodoItem** → 個別項目の表示・編集・削除のみ

#### 3. **再利用性とテスタビリティ**

- 各コンポーネントが独立して動作
- カスタムフックでロジックを分離
- 単体テストが書きやすい構造

---

## 学習の流れ・ソースコードを読む順番

### **STEP 1: 全体像の把握**

1. **README.md**（このファイル）で技術構成を確認
2. **package.json** で依存関係を把握
3. **ソースコードの読み方ガイド.md** で学習方針を確認

### **STEP 2: アプリの起点から読む**

```
main.tsx → App.tsx
```

- **main.tsx**: React アプリを画面に描画する起点
- **App.tsx**: アプリ全体のレイアウトと機能統合

### **STEP 3: データ構造と型定義を理解**

```
types/todo.ts
```

- Todo の基本的なデータ構造
- TypeScript の型定義の書き方
- 型安全性の重要性

### **STEP 4: 状態管理・ビジネスロジックを学ぶ**

```
hooks/useTodos.ts → hooks/useEditTodo.ts
```

- カスタムフックによる状態管理
- localStorage 連携
- 関心の分離（UI とロジックの分離）

### **STEP 5: UI コンポーネントの流れを追う**

```
components/TodoInput.tsx → components/TodoList.tsx → components/TodoItem.tsx
```

- React コンポーネントの基本構造
- props によるデータの受け渡し
- イベントハンドリング

---

## このアプリで学べる React の重要概念

### **1. コンポーネント設計**

- **合成（Composition）**: 小さなコンポーネントを組み合わせて大きな機能を作る
- **props**: 親から子へのデータ受け渡し
- **状態管理**: useState, useEffect の使い方

### **2. データフローの理解**

```
App（状態保持）
 ↓ props
TodoList（表示制御）
 ↓ props
TodoItem（個別操作）
 ↑ イベント
App（状態更新）
```

### **3. カスタムフックによるロジック分離**

- **useTodos**: Todo 一覧の CRUD 操作
- **useEditTodo**: 編集状態の管理
- UI コンポーネントからビジネスロジックを分離

### **4. TypeScript による型安全性**

- コンパイル時エラー検出
- IDE での自動補完・リファクタリング支援
- 保守性の向上

---

## 実装されている機能

- Todo の追加・編集・削除
- ドラッグ&ドロップによる並び替え
- localStorage によるデータ永続化
- Enter キーによる追加・保存
- Escape キーによる編集キャンセル
- レスポンシブデザイン（スマホ対応）

---

## セットアップ・起動方法

### **環境要件**

- Node.js 18 以上
- npm または yarn

### **インストール手順**

```bash
# 1. リポジトリをクローン
git clone <repository-url>
cd localstrage-todo

# 2. 依存パッケージをインストール
npm install

# 3. 開発サーバー起動
npm run dev

# 4. ブラウザで http://localhost:5173 にアクセス
```

### **その他のコマンド**

```bash
# 本番用ビルド
npm run build

# ビルド結果をプレビュー
npm run preview

# 型チェック
npm run type-check
```

---

## 学習のポイント・注意点

### **初学者向けのアドバイス**

1. **まずは動かしてみる**

   - アプリを実際に使って機能を確認
   - Todo の追加・編集・削除・並び替えを体験

2. **コメントを頼りにコードを読む**

   - 各ファイルに初学者向けの詳細コメントあり
   - わからない部分は一旦飛ばして全体の流れを掴む

3. **段階的に理解を深める**
   - 最初は「何をしているか」を把握
   - 慣れてきたら「なぜそうするか」を考える
   - 最終的に「他の方法はあるか」を検討

### **つまずきやすいポイント**

- **props の受け渡し**: 親 → 子の一方向データフロー
- **useEffect の依存配列**: いつ副作用が実行されるか
- **TypeScript の型エラー**: 型定義と実際の値の不一致
- **ドラッグ&ドロップ**: ライブラリ固有の概念・実装方法

---

## カスタマイズ・拡張のアイデア

### **初級者向け**

- [ ] Todo にカテゴリ機能を追加
- [ ] 完了・未完了の切り替え機能
- [ ] Todo の優先度設定
- [ ] ダークモード対応

### **中級者向け**

- [ ] 検索・フィルター機能
- [ ] Todo の期限設定・通知
- [ ] データのインポート・エクスポート
- [ ] マルチユーザー対応（ログイン機能）

### **上級者向け**

- [ ] バックエンド API との連携
- [ ] リアルタイム同期（WebSocket）
- [ ] PWA（プログレッシブ Web アプリ）対応
- [ ] 単体テスト・E2E テストの追加

---

## 参考資料・学習リソース

### **公式ドキュメント**

- [React 公式ドキュメント](https://react.dev/)
- [TypeScript ハンドブック](https://www.typescriptlang.org/docs/)
- [Chakra UI ドキュメント](https://v2.chakra-ui.com/)
- [Vite ガイド](https://ja.vitejs.dev/guide/)

### **学習サイト・書籍**

- React 入門書籍・オンライン教材
- TypeScript 実践ガイド
- モダンフロントエンド開発の解説記事

---

## このリポジトリについて

- **開発手法**: GitHub Copilot を活用したペアプログラミング
- **学習目的**: React + TypeScript の実践的な学習教材
- **対象者**: React 初学者〜中級者
- **メンテナンス**: コミュニティ主導での改善・更新

### **貢献・フィードバック**

- バグ報告や改善提案は Issue でお知らせください
- 学習内容の追加・修正の Pull Request も歓迎です
- 初学者の視点での質問・疑問も大歓迎です

---

## ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルをご確認ください。

---

## 謝辞

このプロジェクトは以下の優れたライブラリ・ツールによって支えられています：

- React チーム
- TypeScript チーム
- Chakra UI コミュニティ
- Vite 開発チーム
- GitHub Copilot
