// // @ts-check
import url from '@rollup/plugin-url';
import json from '@rollup/plugin-json';
// import babel from '@rollup/plugin-babel';
import vuePlugin from '@vitejs/plugin-vue2';
import vueJsxPlugin from '@vitejs/plugin-vue2-jsx';
import styles from 'rollup-plugin-styles';
import postcssPresetEnv from 'postcss-preset-env'
import * as path from 'path'
// import postcssUrl from 'postcss-url'
import copy from 'rollup-plugin-copy'

import esbuild from 'rollup-plugin-esbuild';
// import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
// import analyzer from 'rollup-plugin-analyzer';
// import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
// import { DEFAULT_EXTENSIONS } from '@babel/core';
import multiInput from 'rollup-plugin-multi-input';
import nodeResolve from '@rollup/plugin-node-resolve';
import staticImport from 'rollup-plugin-static-import';
import ignoreImport from 'rollup-plugin-ignore-import';

import pkg from '../package.json';

const externalDeps = Object.keys(pkg.dependencies || {}).concat([/lodash/, /@babel\/runtime/]);
const externalPeerDeps = Object.keys(pkg.peerDependencies || {});
const inputList = ['src/**/*.ts']

const getPlugins = ({
  // extractMultiCss = false,
}) => {
  const plugins = [
    nodeResolve(),
    commonjs(),
    vuePlugin(),
    vueJsxPlugin(),
    esbuild({
      target: 'esnext',
      sourceMap: true,
      loaders: {
        '.vue': 'ts'
      },
    }),
    json(),
    url(),
    replace({
      preventAssignment: true,
      values: {
        __VERSION__: JSON.stringify(pkg.version),
      },
    }),
    staticImport({
      include: ['src/**/style/css.js'],
    }),
    ignoreImport({
      include: ['src/*/style/*'],
      body: 'import "./style/css.js";',
    }),
  ];
  return plugins
}



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

/** @type {import('rollup').RollupOptions} */
const esConfig = {
  input: inputList.concat('!src/index-lib.ts'),
  // 为了保留 style/css.js
  treeshake: false,
  external: externalDeps.concat(externalPeerDeps),
  plugins: [multiInput()].concat(getPlugins({ extractMultiCss: true })),
  output: {
    dir: 'es/',
    format: 'esm',
    sourcemap: true,
    chunkFileNames: '_chunks/dep-[hash].js',
  },
};

export default [
  cssConfig,
  esConfig
]
