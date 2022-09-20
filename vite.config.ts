// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()]
// })

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()]
// })

const { defineConfig, loadEnv } = require('vite');
const path = require('path');

function pathResolve(dir) {
  return path.resolve(__dirname, '.', dir);
}

import utools from 'vite-plugin-utools';

const viteBaseConfig = require(pathResolve('config/vite.base.config.ts'));
const viteServeConfig = require(pathResolve('config/vite.serve.config.ts'));
const viteBuildConfig = require(pathResolve('config/vite.build.config.ts'));

// 使用策略模式来加载不同的配置文件
const configResover: { [key: string]: Function } = {
  build: (env: any) => {
    console.log('build mode, will load build viteProdConfig');
    return Object.assign(viteBaseConfig, viteBuildConfig(env));
    // 等价于语句： ({...viteBaseConfig,...viteBuildConfig})
  },
  serve: (env: any) => {
    console.log('dev mode, will load build viteDevConfig');
    // console.log(Object.assign(viteBaseConfig, viteServeConfig(env)));
    return Object.assign(viteBaseConfig, viteServeConfig(env));
  },
};

const envResolver: { [key: string]: Function } = {
  development: () => {
    console.log('will load development env');
    return loadEnv('development', path.resolve(__dirname, './env'), ''); // 后面的参数为空表示生产环境暴露所有配置参数方便调试
  },
  production: () => {
    console.log('will load production env');
    return loadEnv('production', process.cwd() + '/env', 'VITE_'); // 后面的参数 'VITE_' 便是生产幻境只暴露指定前缀为VITE_开头的配置
  },
};

const utoolsPlugin = utools({
  external: 'uTools',
  preload: {
    path: './utools/preload.ts',
    watch: true,
    name: 'window.preload',
  },
  buildUpx: {
    pluginPath: './utools/plugin.json',
    outDir: './dist/upx',
    outName: '[pluginName]_[version].upx',
  },
});

module.exports = defineConfig(
  ({ command = '', mode = 'development', utoolsBuildFlag = true }) => {
    const env: any = envResolver[mode]();
    let config = configResover[command](env);
    if (utoolsBuildFlag) {
      config.plugins = [...config.plugins, utoolsPlugin];
    }
    return config;
  }
);
