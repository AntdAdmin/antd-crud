import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path';
import { readFileSync } from 'fs'

const packageJson = JSON.parse(
    readFileSync('./package.json', { encoding: 'utf-8' }),
)

const globals = {
  ...(packageJson?.dependencies || {}),
}
export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, './src/components/AntdCrud/index.tsx'),
      name: 'antd-crud',
      fileName: 'antd-crud',
      formats: ['es', 'cjs'],
    },

    rollupOptions: {
      // 排除不相关的依赖
      external: ['react', 'react-dom', ...Object.keys(globals)],
    },
    outDir: 'lib/dist'
  },
  plugins: [react()],
})
