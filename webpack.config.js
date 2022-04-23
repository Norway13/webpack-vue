
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "development", // "production" | "development" | "none"
    // Chosen mode tells webpack to use its built-in optimizations accordingly.

    entry: "./src/main.js", // string | object | array
    // webpack 开始打包

    output: {
        path: path.resolve(__dirname, "dist"), // string
        filename: "bundle.[hash:10].js", // string
        // filename: "bundle.js", // string

    },
    devServer: {
        static: './dist',
        compress: true, // 是否开启Gzip
        port: 9000,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader:'babel-loader',
                        options:{
                            presets:['@babel/preset-env'],
                            plugins:['@babel/plugin-transform-runtime']
                        }
                    }
                ],
                include: path.join(__dirname,'./src'),
                exclude:'/node_modules/'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
        ],

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true, //单行压缩  4.0.0-beta.0
            }

        }),
        new MiniCssExtractPlugin({
            filename: 'index.css',
        }),
        new CleanWebpackPlugin(),

    ]
}
