// ********************************************************************************
// --------------------------------------------------------------------------------
// 1.) PACKAGES
// --------------------------------------------------------------------------------
// ********************************************************************************

// 1.1) path: specifies the location of the module that needs to be loaded
const path = require('path');

// 1.2) webpack: build-tool we are going to use
const webpack = require('webpack');

// 1.3) html-webpack-plugin: simplifies the creation of HTML files to serve the webpack bundles
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 1.4) clean-webpack-plugin: ensures that only the used files will be generated in the output directory
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// ********************************************************************************
// --------------------------------------------------------------------------------
// 2.) CONFIGURATION
// --------------------------------------------------------------------------------
// ********************************************************************************
module.exports = {

    // ----------------------------------------
    // 2.1) Configure basics
    // ----------------------------------------
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',

    // ----------------------------------------
    // 2.2) Configure output
    // ----------------------------------------
    output: {
        // define the output location
        path: path.resolve(__dirname, 'dist/dev'),
        // sets the output target type
        libraryTarget: 'var',
        // exports the built module as a variable to be used in the browser environment to ensure communication between files
        library: 'Client'
    },

    // ----------------------------------------
    // 2.3) Configure development server
    // ----------------------------------------
    devServer: {
        port: 8080
    },

    // ----------------------------------------
    // 2.4) Configure loaders
    // ----------------------------------------
    module: {
        rules: [
            {
                // transforms modern JavaScript code into ECMAScript 5 (ES5) code, which can be run in older browsers
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: 'babel-loader'
            },
            {
                // transforms SASS files into normal CSS files
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']

            }
        ]
    },

    // ----------------------------------------
    // 2.5) Configure plugins
    // ----------------------------------------
    plugins: [

        new HtmlWebpackPlugin({
            template: './src/client/views/index.html',
            filename: 'index.html'
        }),

        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write logs to console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ]
};