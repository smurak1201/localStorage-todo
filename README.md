# localstrage-todo

## 概要

シンプルな Todo リストアプリです。React + TypeScript + Vite をベースに、Chakra UI でスタイリング、localStorage でデータ永続化を行っています。

## 主な技術・構成

- 言語: TypeScript, JavaScript
- フレームワーク: React
- ビルドツール: Vite
- UI ライブラリ: Chakra UI
- 状態管理: React Hooks（useState, useEffect, カスタムフック）
- ドラッグ＆ドロップ: @hello-pangea/dnd
- データ永続化: localStorage
- 型定義: TypeScript

## ディレクトリ構成

- `src/` ... アプリ本体
  - `components/` ... UI コンポーネント
  - `hooks/` ... カスタムフック
  - `types/` ... 型定義
  - `assets/` ... 画像等
- `public/` ... 公開用ファイル

## セットアップ・起動方法

1. リポジトリをクローン
2. `npm install` で依存パッケージをインストール
3. `npm run dev` で開発サーバー起動

## このリポジトリについて

- GitHub Copilot を活用して設計・実装しています
- Copilot の学習データは 2024 年 6 月までの情報を元にしています

## ライセンス

MIT License
