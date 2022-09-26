// // @ts-check
// import url from '@rollup/plugin-url';
// import json from '@rollup/plugin-json';
// import babel from '@rollup/plugin-babel';
// import vuePlugin from 'rollup-plugin-vue';
import styles from 'rollup-plugin-styles';
import postcssPresetEnv from 'postcss-preset-env'
import * as path from 'path'
// import postcssUrl from 'postcss-url'
import copy from 'rollup-plugin-copy'

// import esbuild from 'rollup-plugin-esbuild';
// import postcss from 'rollup-plugin-postcss';
// import replace from '@rollup/plugin-replace';
// import analyzer from 'rollup-plugin-analyzer';
// import { terser } from 'rollup-plugin-terser';
// import commonjs from '@rollup/plugin-commonjs';
// import { DEFAULT_EXTENSIONS } from '@babel/core';
import multiInput from 'rollup-plugin-multi-input';
// import nodeResolve from '@rollup/plugin-node-resolve';
// import staticImport from 'rollup-plugin-static-import';
// import ignoreImport from 'rollup-plugin-ignore-import';

const cssConfig = {
  input: ['src/**/style/index.js'],
  plugins: [
    multiInput(),
    styles({
      mode: 'extract',
      url: false,
      plugins: [
        postcssPresetEnv(),
      ]
    }),
    copy({
      targets: [
        { src: path.resolve(__dirname, '../src/assets/**/*'), dest: path.resolve(__dirname, '../dist/es/assets') }
      ]
    })
  ],
  output: {
    dir: 'dist/es/',
    sourcemap: true,
    assetFileNames: '[name].css',
  },
}
export default [
  cssConfig
]
