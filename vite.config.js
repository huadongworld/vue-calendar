import {defineConfig} from 'vite';// 导入 Vite 中的 defineConfig 函数
import {createVuePlugin} from 'vite-plugin-vue2';// 导入用于支持 Vue 2 的 Vite 插件
import commonjs from '@rollup/plugin-commonjs';// 导入兼容 CommonJS 模块的 Rollup 插件
import path from 'path';// 导入 Node.js 内置的路径模块

const commonConfig = {
    plugins: [createVuePlugin()],// 使用 createVuePlugin() 作为 Vite 插件
};

export default defineConfig(({command, mode}) => {
    // dev config（开发配置）
    if (command === 'serve') {
        return {
            ...commonConfig,
            resolve: {
                alias: {
                    vue: 'vue/dist/vue',// 使用压缩版的 Vue.js
                },
            },
            server: {
                open: '/src/index.html',// 在启动开发服务器时自动打开示例页面
            },
        };
    }

    // build config（构建配置）
    const shouldMinify = mode.includes('minify');// 根据模式判断是否进行代码压缩
    const isESM = mode.includes('esm');// 根据模式判断是否输出 ES 模块 (ESM)
    const isIE11 = mode.includes('ie11');// 根据模式判断是否针对 IE11 进行构建

    const filenameBase = `toastui-vue-calendar${isIE11 ? '.ie11' : ''}${shouldMinify ? '.min' : ''}`;// 构建输出文件名的基础部分

    const buildConfig = {
        ...commonConfig,
        build: {
            emptyOutDir: false,// 是否在构建前清空输出目录
            lib: {
                entry: path.resolve(__dirname, 'src/Calendar.js'),// 指定构建库的入口文件路径
                name: 'tui.VueCalendar',// 指定构建库的全局变量名
                formats: isESM ? ['es'] : ['umd'],// 构建输出的格式，ES 模块或 UMD
                fileName: (format) => `${filenameBase}${format === 'es' ? '.m' : '.'}js`,// 构建输出文件名的格式
            },
            rollupOptions: {
                external: ['vue'],// 将 vue 视为外部依赖，不会打包到库中
                output: {
                    globals: {
                        vue: 'Vue',// 指定全局变量名和对应的模块名
                    },
                },
            },
            minify: shouldMinify,// 是否进行代码压缩
        },
    };

    if (isIE11) {
        Object.assign(buildConfig, {
            resolve: {
                alias: {
                    '@toast-ui/calendar': '@toast-ui/calendar/ie11',// 针对 IE11 使用特定的别名解析
                },
            },
        });
        buildConfig.plugins.push(
            commonjs({
                transformMixedEsModules: true,// 兼容处理混合 ES 模块和 CommonJS 模块的情况
            })
        );
    }

    return buildConfig;// 返回最终的构建配置对象
});
