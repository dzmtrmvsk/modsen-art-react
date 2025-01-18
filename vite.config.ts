import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/constants': path.resolve(__dirname, 'src/constants'),
      '@/contexts': path.resolve(__dirname, 'src/contexts'),
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
      '@/pages': path.resolve(__dirname, 'src/pages'),
      '@/styles': path.resolve(__dirname, 'src/styles'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
      '@/types': path.resolve(__dirname, 'src/types'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@/routes': path.resolve(__dirname, 'src/routes')
    }
  }
})
