import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Базовый путь важен для GitHub Pages.
  // Если ваш репозиторий называется blend-social, это обеспечит правильные пути к assets.
  // Использование './' делает пути относительными, что часто решает проблемы с деплоем.
  base: './', 
});