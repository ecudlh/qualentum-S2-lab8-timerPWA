const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => ({
    entry: './main.js',
  
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    module: {
        rules: [
            {
                test: /\.m?js/,
                type: "javascript/auto",
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(css|s[ac]ss)$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {
                    loader: "html-loader",
                },
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|mp3|wav|mp4|webm)$/,
                exclude: /node_modules/,
                type: 'asset/resource',
                generator: {
                    filename: './assets/[name][ext]'
                },
            },
            {
                test: /\.(json)$/,
                exclude: /node_modules/,
                type: 'asset/resource',
                generator: {
                    filename: './[name][ext]'
                },
            },
        ],
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: "./index.html",
            filename: "./index.html",
            scriptLoading: 'module'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new CopyPlugin({
            patterns : [
                // { from: "./src/images/screenshots", to: "assets" },
                { from: "./sw.js", to: "./" },
                { from: "src/images/icons/*.png", to: "assets/[name][ext]" },
            ],
        }),
    ],
});
