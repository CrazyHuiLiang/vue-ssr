// vue.config.js

const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const nodeExternals = require("webpack-node-externals");
const merge = require("lodash.merge");
const TARGET_NODE = process.env.WEBPACK_TARGET === "node";
const target = TARGET_NODE ? "server" : "client";
const isDev = process.env.NODE_ENV !== 'production';


module.exports = {
    css: {
        extract: false
    },
    // 添加一个字段，如果是开发环境，就指定到webpack dev server中
    // publicPath: isDev ? 'http://127.0.0.1:8080' : '',
    configureWebpack: () => ({
        // 将 entry 指向应用程序的 server / client 文件
        entry: `./src/entry-${target}.ts`,
        // 对 bundle renderer 提供 source map 支持
        devtool: 'source-map',

        target: TARGET_NODE ? "node" : "web",
        node: TARGET_NODE ? undefined : false,
        output: {
            libraryTarget: TARGET_NODE ? "commonjs2" : undefined
        },
        // https://webpack.js.org/configuration/externals/#function
        // https://github.com/liady/webpack-node-externals
        // 外置化应用程序依赖模块。可以使服务器构建速度更快，
        // 并生成较小的 bundle 文件。
        externals: TARGET_NODE
            ? nodeExternals({
                // 不要外置化 webpack 需要处理的依赖模块。
                // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
                // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
                whitelist: [/\.css$/]
            })
            : undefined,
        optimization: {
            splitChunks: undefined
        },
        plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()],
        // 添加一个 devServer的字段
        devServer: {
            host: '127.0.0.1',
            port: 4000,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }
        },
    }),
    chainWebpack: config => {
        config.module
            .rule("vue")
            .use("vue-loader")
            .tap(options => {
                merge(options, {
                    optimizeSSR: false
                });
            });
    }
};
