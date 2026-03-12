import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

function emitImportedAssets(): Plugin {
  const assetsDir = path.resolve(__dirname, "src/assets");
  return {
    name: "emit-imported-assets",
    apply: "build",
    generateBundle(_options, bundle) {
      const bundleJs = Object.values(bundle).find(
        (chunk) => chunk.type === "chunk" && chunk.fileName.endsWith(".js")
      );
      if (!bundleJs || bundleJs.type !== "chunk") return;

      const files = fs.readdirSync(assetsDir);
      for (const file of files) {
        if (!/\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file)) continue;
        const ext = path.extname(file);
        const base = path.basename(file, ext);
        const match = bundleJs.code.match(
          new RegExp(`/assets/(${base}-[A-Za-z0-9]+${ext.replace(".", "\\.")})`)
        );
        if (match) {
          this.emitFile({
            type: "asset",
            fileName: `assets/${match[1]}`,
            source: fs.readFileSync(path.join(assetsDir, file)),
          });
        }
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), emitImportedAssets()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    assetsInlineLimit: 0,
  },
});
