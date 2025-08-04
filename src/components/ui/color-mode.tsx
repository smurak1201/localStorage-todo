/**
 * カラーモード（ダーク/ライトモード）管理機能
 *
 * このファイルの役割：
 * - ダークモード/ライトモードの切り替え機能を提供
 * - next-themesライブラリを使用したテーマ管理
 * - Chakra UI v3との連携でカラーモードを実現
 * - プロバイダーパターンでアプリ全体にテーマ機能を提供
 *
 * 使用技術：
 * - next-themes: テーマ管理ライブラリ
 * - Chakra UI v3: UIコンポーネントライブラリ
 * - react-icons: アイコンライブラリ（月・太陽アイコン）
 */

// Next.js のクライアントサイド実行を指定
// ※ブラウザでのみ実行される（SSRでは実行されない）
"use client";

// Chakra UI v3のコンポーネントと型定義をインポート
// IconButtonProps: アイコンボタンのprops型
// SpanProps: Spanコンポーネントのprops型
// ClientOnly: クライアントサイドでのみレンダリングするコンポーネント
// IconButton: アイコン付きボタンコンポーネント
// Skeleton: ローディング時のスケルトン表示
// Span: インラインテキスト表示用コンポーネント
import type { IconButtonProps, SpanProps } from "@chakra-ui/react";
import { ClientOnly, IconButton, Skeleton, Span } from "@chakra-ui/react";

// next-themes: テーマ管理ライブラリ
// ThemeProvider: テーマ機能をアプリ全体に提供するプロバイダー
// useTheme: 現在のテーマ状態とテーマ操作機能を提供するフック
// ThemeProviderProps: ThemeProviderコンポーネントのprops型
import { ThemeProvider, useTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

// React本体をインポート
// forwardRefなどのReact機能で使用
import * as React from "react";

// react-icons: アイコンライブラリからLucideアイコンをインポート
// LuMoon: 月アイコン（ダークモード用）
// LuSun: 太陽アイコン（ライトモード用）
import { LuMoon, LuSun } from "react-icons/lu";

/**
 * ColorModeProviderコンポーネントのprops型定義
 *
 * ThemeProviderPropsを継承して、next-themesの全機能を利用可能にする
 */
export interface ColorModeProviderProps extends ThemeProviderProps {}

/**
 * カラーモード機能をアプリ全体に提供するプロバイダーコンポーネント
 *
 * @param props - ThemeProviderに渡すprops（テーマ設定など）
 * @returns JSX要素（ThemeProviderをラップしたコンポーネント）
 */
export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    // next-themesのThemeProvider
    // attribute="class": CSSクラス名でテーマを管理（例: .dark, .light）
    // disableTransitionOnChange: テーマ切り替え時のアニメーションを無効化
    // ...props: 親から渡されたpropsを展開
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  );
}

/**
 * カラーモードの型定義
 *
 * ライトモードとダークモードの2種類のみサポート
 */
export type ColorMode = "light" | "dark";

/**
 * useColorModeフックの戻り値型定義
 *
 * カラーモード操作に必要な値と関数をまとめた型
 */
export interface UseColorModeReturn {
  colorMode: ColorMode; // 現在のカラーモード
  setColorMode: (colorMode: ColorMode) => void; // カラーモード設定関数
  toggleColorMode: () => void; // カラーモード切り替え関数
}

/**
 * カラーモード管理カスタムフック
 *
 * next-themesのuseThemeフックをラップして、
 * アプリ固有のカラーモード操作機能を提供
 *
 * @returns カラーモード状態と操作関数
 */
export function useColorMode(): UseColorModeReturn {
  // next-themesからテーマ情報を取得
  // resolvedTheme: 実際に適用されているテーマ
  // setTheme: テーマ設定関数
  // forcedTheme: 強制設定されたテーマ（通常はnull）
  const { resolvedTheme, setTheme, forcedTheme } = useTheme();

  // 現在のカラーモードを決定（強制テーマ優先、なければ解決済みテーマ）
  const colorMode = forcedTheme || resolvedTheme;

  // カラーモード切り替え関数
  // 現在がダークなら→ライト、ライトなら→ダークに切り替え
  const toggleColorMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  // カスタムフックの戻り値
  return {
    colorMode: colorMode as ColorMode, // 型安全性のためにColorMode型にキャスト
    setColorMode: setTheme, // next-themesのsetTheme関数をそのまま公開
    toggleColorMode, // 切り替え専用関数
  };
}

/**
 * カラーモードに応じて値を選択するカスタムフック
 *
 * ライトモード時とダークモード時で異なる値を使いたい場合に使用
 *
 * @param light - ライトモード時に返す値
 * @param dark - ダークモード時に返す値
 * @returns 現在のカラーモードに応じた値
 */
export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? dark : light;
}

/**
 * 現在のカラーモードに応じたアイコンを表示するコンポーネント
 *
 * ダークモード時は月アイコン、ライトモード時は太陽アイコンを表示
 *
 * @returns JSX要素（月または太陽のアイコン）
 */
export function ColorModeIcon() {
  const { colorMode } = useColorMode();
  // 三項演算子でカラーモードに応じてアイコンを切り替え
  return colorMode === "dark" ? <LuMoon /> : <LuSun />;
}

/**
 * ColorModeButtonコンポーネントのprops型定義
 *
 * IconButtonPropsから「aria-label」を除外
 * （内部で固定の「Toggle color mode」を設定するため）
 */
interface ColorModeButtonProps extends Omit<IconButtonProps, "aria-label"> {}

/**
 * カラーモード切り替えボタンコンポーネント
 *
 * クリックでライト/ダークモードを切り替えるアイコンボタン
 * ClientOnlyでラップすることで、SSR時の不整合を防ぐ
 */
export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  ColorModeButtonProps
>(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useColorMode();

  return (
    // ClientOnly: クライアントサイドでのみレンダリング
    // fallback: サーバーサイドレンダリング時に表示するコンポーネント
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton
        onClick={toggleColorMode} // クリック時にカラーモード切り替え
        variant="ghost" // 透明背景のボタンスタイル
        aria-label="Toggle color mode" // アクセシビリティ用のラベル
        size="sm" // 小サイズボタン
        ref={ref} // 親から渡されたref
        {...props} // 親から渡されたその他のprops
        css={{
          // アイコンのサイズ調整
          _icon: {
            width: "5", // 幅: 1.25rem
            height: "5", // 高さ: 1.25rem
          },
        }}
      >
        {/* 現在のカラーモードに応じたアイコンを表示 */}
        <ColorModeIcon />
      </IconButton>
    </ClientOnly>
  );
});

/**
 * ライトモード強制表示コンポーネント
 *
 * 子要素を強制的にライトモードで表示したい場合に使用
 * （アプリ全体のテーマに関係なく、部分的にライトモードにしたい場合）
 */
export const LightMode = React.forwardRef<HTMLSpanElement, SpanProps>(
  function LightMode(props, ref) {
    return (
      <Span
        color="fg" // 前景色（テキスト色）
        display="contents" // 要素自体は表示せず、子要素のみ表示
        className="chakra-theme light" // Chakra UIのライトテーマクラス
        colorPalette="gray" // グレー系のカラーパレット
        colorScheme="light" // ライトカラースキーム
        ref={ref} // 親から渡されたref
        {...props} // 親から渡されたprops
      />
    );
  }
);

/**
 * ダークモード強制表示コンポーネント
 *
 * 子要素を強制的にダークモードで表示したい場合に使用
 * （アプリ全体のテーマに関係なく、部分的にダークモードにしたい場合）
 */
export const DarkMode = React.forwardRef<HTMLSpanElement, SpanProps>(
  function DarkMode(props, ref) {
    return (
      <Span
        color="fg" // 前景色（テキスト色）
        display="contents" // 要素自体は表示せず、子要素のみ表示
        className="chakra-theme dark" // Chakra UIのダークテーマクラス
        colorPalette="gray" // グレー系のカラーパレット
        colorScheme="dark" // ダークカラースキーム
        ref={ref} // 親から渡されたref
        {...props} // 親から渡されたprops
      />
    );
  }
);
