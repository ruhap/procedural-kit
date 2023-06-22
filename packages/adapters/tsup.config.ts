import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["express/index.ts"],
  sourcemap: true,
  clean: true,
  dts: true,
  format: ["cjs", "esm"],
});
