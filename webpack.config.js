const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'none',
    target: 'node',
    node: {
        fsevents: 'empty'
    },
    entry: {
        app: './server.js',
        print: './index.js'
    },
    plugins: [
        // new CleanWebpackPlugin(),
        // new HtmlWebpackPlugin({
        //     title: 'Html Webpack',
        // }),
    ],
    // rules: [
    //     {
    //         test: path.resolve(__dirname, 'views/**') /\.css$ /,
    //         use: [
    //             'style-loader',
    //             'css-loader',
    //         ],
    //     },
    //     {
    //         test: /\.handlebars$/,
    //         loader: "handlebars-loader"
    //     },
    //     {
    //         test: /\.   $/i,
    //         use: 'raw-loader',
    //     }
    // ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'app'),
    },
};