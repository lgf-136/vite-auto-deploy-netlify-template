// import autoprefixer from 'autoprefixer';
// import stylelint from 'stylelint';
// import postcssPresetEnv from 'postcss-preset-env';
// import pxtorem from 'postcss-pxtorem';
// import path, { dirname } from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// export default {
//   // 不生成 sourcemaps
//   map: false,

//   plugins: [
//     // 语法校验
//     stylelint({
//       fix: true, // 自动修复
//     }),

//     // 自动添加浏览器前缀
//     autoprefixer,

//     // 使用新语法
//     postcssPresetEnv({
//       stage: 0,
//       // 配置postcsss 全局变量
//       importFrom: path.resolve(__dirname, './src/styles/globalVars.css'),
//     }),

//     // 单位转换：px->rem
//     pxtorem,
//   ],
// };

const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');
const postcssPresetEnv = require('postcss-preset-env');
const pxtorem = require('postcss-pxtorem');
const tailwindcss = require('tailwindcss');

module.exports = {
  // 不生成 sourcemaps
  map: false,

  plugins: [
    // 语法校验
    stylelint({
      fix: true, // 自动修复
    }),

    // 自动添加浏览器前缀
    autoprefixer,

    // 使用新语法
    postcssPresetEnv({
      stage: 0,
      // 配置postcsss 全局变量
      // importFrom: path.resolve(__dirname, './src/styles/globalVars.css'),
    }),

    // 单位转换：px->rem
    pxtorem,
    // 加载 tailwindcss
    tailwindcss,
  ],
};
