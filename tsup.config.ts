import { defineConfig } from "tsup";
import * as sass from "sass";
import * as esbuild from "esbuild";
import fs from "fs/promises";

const quartzInlineLoader = (): esbuild.Plugin => ({
  name: "quartz-inline-loader",
  setup(build) {
    // Handle ?raw imports (imports file content as string)
    build.onResolve({ filter: /\?raw$/ }, (args) => {
      return {
        path: args.path,
        namespace: "raw-loader",
        pluginData: { resolveDir: args.resolveDir },
      };
    });

    build.onLoad({ filter: /\?raw$/, namespace: "raw-loader" }, async (args) => {
      const realPath = args.path.replace(/\?raw$/, "");
      const result = await build.resolve(realPath, {
        resolveDir: args.pluginData.resolveDir,
        kind: "import-statement",
      });

      if (result.errors.length > 0) {
        return { errors: result.errors };
      }

      return {
        contents: await fs.readFile(result.path, "utf-8"),
        loader: "text",
      };
    });

    // Handle SCSS imports (both normal and ?inline)
    build.onResolve({ filter: /\.scss(\?inline)?$/ }, async (args) => {
      // If it has the suffix, we must resolve it manually to find the file
      if (args.path.endsWith("?inline")) {
        const realPath = args.path.replace(/\?inline$/, "");
        const result = await build.resolve(realPath, {
          resolveDir: args.resolveDir,
          kind: "import-statement",
        });

        if (result.errors.length > 0) {
          return { errors: result.errors };
        }

        return {
          path: result.path,
          namespace: "scss-loader",
        };
      }
      // Otherwise allow default resolution
      return undefined;
    });

    // Load SCSS from custom namespace (from ?inline resolution)
    build.onLoad({ filter: /.*/, namespace: "scss-loader" }, (args) => {
      const result = sass.compile(args.path, { style: "compressed" });
      return {
        contents: result.css,
        loader: "text",
      };
    });

    // Load SCSS from default file namespace (normal imports without suffix)
    build.onLoad({ filter: /\.scss$/ }, (args) => {
      const result = sass.compile(args.path, { style: "compressed" });
      return {
        contents: result.css,
        loader: "text",
      };
    });

    // Load CSS files as text strings
    build.onLoad({ filter: /\.css$/ }, async (args) => {
      const css = await fs.readFile(args.path, "utf-8");
      return {
        contents: css,
        loader: "text",
      };
    });

    // Compile inline TS to a minified IIFE JavaScript string
    build.onLoad({ filter: /\.inline\.ts$/ }, async (args) => {
      const result = await esbuild.build({
        entryPoints: [args.path],
        bundle: true,
        minify: true,
        write: false,
        format: "iife",
        target: "es2020",
      });
      return {
        contents: result.outputFiles?.[0]?.text || "",
        loader: "text",
      };
    });
  },
});

export default defineConfig({
  entry: {
    index: "src/index.ts",
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  target: "es2022",
  splitting: false,
  outDir: "dist",
  platform: "node",
  banner: {
    js: 'import { createRequire } from "module"; const require = createRequire(import.meta.url);',
  },
  noExternal: ["katex", "pseudocode"],
  esbuildPlugins: [quartzInlineLoader()],
});
