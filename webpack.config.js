const WebpackNotifierPlugin = require('webpack-notifier');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
// const webpack = require('webpack');

module.exports = {
    entry: [
        'babel-polyfill',
        './src/index.js',
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                }),
            },
        ],
    },
    plugins: [
        new WebpackNotifierPlugin({ title: 'Webpack' }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: {
                baseDir: ['./', './dist'],
            },
        }),
        new ExtractTextPlugin('style.css'),
        new HTMLWebpackPlugin({
            inject: true,
            template: `${__dirname}/public/index-template.html`,
            filename: `${__dirname}/index.html`,
        }),
    ],
    resolve: {
        modules: [
            path.join(__dirname, 'src'),
            path.join(__dirname, 'public'),
            path.join(__dirname, 'node_modules'),
        ],
        alias: {
            '~': path.resolve(__dirname, 'src', 'app'),
            style: path.resolve(__dirname, 'public', 'sass'),
        },
        extensions: ['.js'],
    },
};
