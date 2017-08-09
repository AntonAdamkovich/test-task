const WebpackNotifierPlugin = require('webpack-notifier');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
// const webpack = require('webpack');

module.exports = {
    entry: [
        'babel-polyfill',
        './src/index.jsx',
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: './build/',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                }),
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]',
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=10000&mimetype=application/octet-stream&name=[name].[ext]',
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
            app: path.resolve(__dirname, 'src', 'app'),
            style: path.resolve(__dirname, 'public', 'sass'),
        },
        extensions: ['.js', '.jsx'],
    },
};
