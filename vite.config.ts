import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 公開URLのルートパスを指定（サブディレクトリ配信の場合は '/localstrage-todo/'）
  base: '/localstrage-todo/',
})
