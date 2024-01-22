import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/vue-crud-practice/",
  plugins: [vue({
    template: {
    }
  })],
  server: {
    watch:{
      usePolling: true
    }
  }
})
