import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import VueRouter from "unplugin-vue-router/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/vue-crud-practice/",
  plugins: [
    VueRouter({}),
    vue({
      template: {},
    }),
    AutoImport({
      dts: true,
      imports: ['vue']
    }),
  ],
  server: {
    watch: {
      usePolling: true,
    },
  },
});
