import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 公開URLのルートパスを指定（サブディレクトリ配信の場合は '/localstorage-todo/'）
  base: '/localstorage-todo/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          chakra: [
            '@chakra-ui/react',
            '@emotion/react',
            '@emotion/styled',
            'framer-motion'
          ],
        },
      },
    },
  },
})
