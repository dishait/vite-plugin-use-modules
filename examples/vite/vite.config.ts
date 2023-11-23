import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Inspect from "vite-plugin-inspect";
import Modules from "vite-plugin-use-modules";

export default defineConfig({
  clearScreen: false,
  plugins: [Vue(), Inspect(), Modules({ auto: true })],
});
