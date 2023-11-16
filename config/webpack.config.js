const path = require('path');// 导入 Node.js 的 path 模块
const { VueLoaderPlugin } = require('vue-loader');// 导入 vue-loader 中的 VueLoaderPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// 导入 mini-css-extract-plugin 中的 MiniCssExtractPlugin
const TerserPlugin = require('terser-webpack-plugin');// 导入 terser-webpack-plugin 中的 TerserPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin');// 导入 clean-webpack-plugin 中的 CleanWebpackPlugin

module.exports = ({ command, mode }) => {
  const isDevelopment = command === 'serve';// 判断是否为开发模式
  const shouldMinify = mode === 'minify';// 判断是否需要进行代码压缩
  const isESM = mode === 'esm';// 判断是否为 ES modules 模式
  const isIE11 = mode === 'ie11';// 判断是否为 IE11 兼容模式
  const cwd = process.cwd();// 获取当前工作目录的路径

  const filenameBase = `toastui-vue-calendar${isIE11 ? '.ie11' : ''}${shouldMinify ? '.min' : ''}`;// 根据不同模式构建输出文件名的基础部分

  const config = {
    entry: './src/Calendar.js',// 入口文件路径
    output: {
      path: path.resolve(__dirname, 'dist'),// 输出路径
      filename: `${filenameBase}.js`,// 输出文件名
      library: 'tui.VueCalendar',// 输出库的名称
      libraryTarget: isESM ? 'module' : 'umd',// 输出库的目标格式
      globalObject: 'this',// 全局对象（用于 UMD 格式）
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,// 匹配以 .js 结尾的文件
          include: [/node_modules\/@lark-open/],// 指定需要处理的文件路径
          use: ['source-map-loader'],// 使用 source-map-loader 进行预处理
          enforce: 'pre',// 在其他加载器之前执行
        },
        {
          oneOf: [
            {
              test: /\.[jt]sx?$/,// 匹配以 .js、.jsx、.ts 或 .tsx 结尾的文件
              include: [path.join(cwd, 'src')],// 指定需要处理的文件路径
              exclude: /node_modules/,// 排除 node_modules 目录下的文件
              use: [
                {
                  loader: require.resolve('esbuild-loader'),// 使用 esbuild-loader 进行转换
                  options: {
                    loader: 'tsx',// 指定加载器类型为 tsx
                    target: 'es2015',// 指定目标浏览器环境为 ES2015
                  },
                },
              ],
            },
            {
              test: /\.css$/,// 匹配以 .css 结尾的文件
              use: [
                isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,// 根据环境选择不同的处理方式
                'css-loader',// 使用 css-loader 处理 CSS 文件
              ],
            },
            {
              test: /\.less$/,// 匹配以 .less 结尾的文件
              use: [
                isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,// 根据环境选择不同的处理方式
                'css-loader',// 使用 css-loader 处理 CSS 文件
                'less-loader',// 使用 less-loader 处理 LESS 文件
              ],
            },
            {
              test: /\.(png|jpg|jpeg|gif|ico|svg)$/,// 匹配以 .png、.jpg、.jpeg、.gif、.ico 或 .svg 结尾的文件
              type: 'asset/resource',// 使用资源模块类型处理
              generator: {
                filename: 'assets/[name][ext][query]',// 设置输出的文件名格式
              },
            },
          ],
        },
      ],
    },
    resolve: {
      alias: {
        vue: 'vue/dist/vue.js',// 设置 vue 模块的别名为 vue/dist/vue.js
        '@toast-ui/calendar': isIE11 ? '@toast-ui/calendar/ie11' : '@toast-ui/calendar',// 根据 IE11 兼容模式决定 @toast-ui/calendar 模块的别名
      },
      extensions: ['.js', '.vue'],// 解析文件时自动补全的扩展名
    },
    plugins: [
      new VueLoaderPlugin(),// 使用 VueLoaderPlugin
      ...(isDevelopment
          ? []// 开发模式下不添加额外的插件
          : [
            new MiniCssExtractPlugin({
              filename: `${filenameBase}.css`,// 添加 MiniCssExtractPlugin，设置输出的 CSS 文件名
            }),
            new CleanWebpackPlugin(),// 添加 CleanWebpackPlugin
          ]),
    ],
    optimization: {
      minimize: shouldMinify,// 是否进行代码压缩
      minimizer: [new TerserPlugin({ extractComments: false })],// 使用 TerserPlugin 进行压缩，禁止提取注释
    },
  };

  if (isESM) {
    config.output.chunkFilename = `${filenameBase}.[id].js`;// 如果是 ES modules 模式，则配置输出 chunk 的文件名
  }

  return config;// 导出配置对象
};
