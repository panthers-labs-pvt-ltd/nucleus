const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    entry: './src/index.js', // Ensure entry is set to index.js
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[contenthash].js',
        publicPath: '/',
    },
    mode: 'development',
    devServer: {
        port: 3000,
        historyApiFallback: true,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": [
                            [
                                "@babel/preset-env",
                                {
                                    "useBuiltIns": "entry",
                                    "corejs": 3,
                                    "exclude": ["proposal-dynamic-import"]
                                }
                            ]
                        ]
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(scss|sass)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i, // Match image files
                type: 'asset/resource', // Handles image files
                generator: {
                    filename: 'assets/images/[name][ext]', // Output path for images
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: true
        }),
        new ModuleFederationPlugin({
            name: 'core_ui',
            filename: 'remoteEntry.js',
            exposes: {
                './CoreUIApp': './src/App', // Expose the CoreUI application
            },
            shared: {
                react: {
                    singleton: true,
                    requiredVersion: '^19.0.0',
                    strictVersion: false, // Prevents exact version mismatches
                    eager: false, // Ensure it's not eager loaded
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: '^19.0.0',
                    strictVersion: false,
                    eager: false,
                },
                'react-router-dom': {
                    singleton: true,
                    requiredVersion: '^7.1.5',
                    eager: false,
                },
            },
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            src: path.resolve(__dirname, 'src/'),
        },
    },
};
