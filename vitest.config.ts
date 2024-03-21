import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    coverage: {
      provider: "v8",
      reporter: ["lcov", "text", "json", "json-summary"],
      // Excluding bootstrapping files.
      exclude: [
        "src/util/types.ts",
        "*.d.ts",
        "src/vite-env.d.ts",
        "src/App.vue",
        "src/main.ts",
        "src/routes.ts",
      ],
      reportOnFailure: true,
    },
  },
});
