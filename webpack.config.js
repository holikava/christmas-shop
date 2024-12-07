const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { SplitChunksPlugin } = require("webpack");

const pages = ['template.html', 'gifts.html'];

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    output: {
        path: path.join(__dirname, "dist"),
        filename: "index.[contenthash:8].js",
        assetModuleFilename: "assets/[name].[contenthash:8][ext]",
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: { sourceMaps: true },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                use: "html-loader",
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.svg$/,
                type: "asset/resource",
                generator: {
                    filename: path.join("icons", "[name].[contenthash:8][ext]"),
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "template.html"),
            filename: "index.html",
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "gifts.html"),
            filename: "gifts.html",
        }),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: ["dist"],
                },
                onEnd: {
                    copy: [
                        {
                            source: path.join("src", "static"),
                            destination: "dist",
                        },
                    ],
                },
            },
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash:8].css",
        }),
    ],
    devServer: {
        watchFiles: path.join(__dirname, "src"),
        port: 9000,
        open: true,
    },
    optimization: {
        minimizer: [
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["jpegtran", { progressive: true }],
                            ["optipng", { optimizationLevel: 5 }],
                            ["svgo", { name: "preset-default" }],
                        ],
                    },
                },
            }),
        ],
    },
};
