import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs"],
  clean: true,
  dts: true,
  shims: true,
  target: "node16",
});
