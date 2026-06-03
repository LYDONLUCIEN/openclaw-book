import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'plugin-inspect-react-code'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isStandalone = mode === 'standalone';
  return {
    base: './',
    plugins: [
      inspectAttr(),
      react(),
      isStandalone && viteSingleFile({ removeViteModuleLoader: true }),
    ].filter(Boolean),
    server: {
      host: '0.0.0.0',
      port: 3002,
      strictPort: true,
    },
    ...(isStandalone ? {
      build: {
        target: 'es2020',
        cssCodeSplit: false,
        assetsInlineLimit: 100000000,
      },
    } : {}),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
