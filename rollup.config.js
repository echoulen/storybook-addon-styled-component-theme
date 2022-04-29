import react from "react";
import reactDom from "react-dom";
import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "rollup-plugin-replace";
import url from "rollup-plugin-url";
import { terser } from "rollup-plugin-terser";
import immutable from "immutable";

export default {
  input: "src/index.ts",
  output: [
    {
      dir: "dist/cjs",
      format: "cjs",
      exports: "named",
      sourcemap: false
    },
    {
      dir: "dist/es",
      format: "es",
      exports: "named",
      sourcemap: false
    }
  ],
  preserveModules: true,
  external: [
    "react",
    "react-dom",
    "react-jss",
    "react-modal",
    "react-file-drop",
    "@types/react",
    "@types/react-dom"
  ],
  plugins: [
    peerDepsExternal(),
    url(),
    nodeResolve({
      browser: true
    }),
    typescript({
      useTsconfigDeclarationDir: true,
      rollupCommonJSResolveHack: true,
      clean: true
    }),
    commonjs({
      include: "./node_modules/**",
      namedExports: {
        react: Object.keys(react),
        "react-dom": Object.keys(reactDom),
        immutable: Object.keys(immutable)
      }
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("development")
    }),
    terser(),
  ]
};
