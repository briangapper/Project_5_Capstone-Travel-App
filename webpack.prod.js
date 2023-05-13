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

// 1.5) mini-css-extract-plugin: extracts CSS into separate files
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 1.6) css-minimizer-webpack-plugin: minifies CSS files
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

// 1.7) terser-webpack-plugin: minifies JS files
const TerserPlugin = require('terser-webpack-plugin');

// 1.8) workbox-webpack-plugin: generates service workers for web application
const WorkboxPlugin = require('workbox-webpack-plugin');

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
    mode: 'production',
    devtool: 'source-map',

    // ----------------------------------------
    // 2.2) Configure output
    // ----------------------------------------
    output: {
        // define the output location
        path: path.resolve(__dirname, 'dist/prod'),
        // sets the output target type
        libraryTarget: 'var',
        // exports the built module as a variable to be used in the browser environment to ensure communication between files
        library: 'Client',
        // handle images
        assetModuleFilename: 'images/[name][ext]'
    },

    // ----------------------------------------
    // 2.3) Configure optimization
    // ----------------------------------------
    optimization: {
        minimizer: [
            new TerserPlugin({}),
            new CSSMinimizerWebpackPlugin({})
        ]
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
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                // handle images
                test: /\.(png|jpe?g|gif|svg)$/,
                type: 'asset/resource'
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
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),

        // new WorkboxPlugin.GenerateSW({})
    ]
};