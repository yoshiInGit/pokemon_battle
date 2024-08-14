import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from 'vite-plugin-singlefile'
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteSingleFile(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        control: "control.html",
      },
    }
  },
  server: {
    open: "index.html"
  }
});
