/**
 * Chakra UI v3 の設定とプロバイダー
 *
 * このファイルの役割：
 * - アプリ全体でChakra UIのコンポーネントを使用可能にする
 * - カラーモード（ライト/ダーク）の設定を統合
 * - main.tsxでアプリ全体をラップして使用される
 *
 * 重要：このProviderがないとChakra UIのコンポーネントが正常に動作しない
 */

// Chakra UI v3の基本的なプロバイダーとデフォルトテーマシステム
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
// カラーモード管理のプロバイダー（ダークモード/ライトモード切り替え）
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

/**
 * アプリ全体をラップするメインのプロバイダーコンポーネント
 *
 * @param props - ColorModeProviderProps（カラーモード設定）
 * @returns JSX要素（ChakraProviderとColorModeProviderの組み合わせ）
 */
export function Provider(props: ColorModeProviderProps) {
  return (
    // Chakra UI v3のメインプロバイダー
    // defaultSystem: Chakra UIのデフォルトテーマとコンポーネント設定
    <ChakraProvider value={defaultSystem}>
      {/* カラーモード管理プロバイダー */}
      {/* ...props: 親から渡されたpropsをすべて子コンポーネントに渡す */}
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
