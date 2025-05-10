const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index.js', // Entry point
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
    clean: true, // optional: cleans old files from build folder
  },
  mode: 'development',
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
    open: true, // optional: auto-open browser
  },
  module: {
    rules: [
      // TypeScript Loader
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true, // Speed up build by skipping type checks
            },
          },
        ],
        exclude: /node_modules/,
      },
      // Babel Loader for JS/JSX
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'entry',
                  corejs: 3,
                  exclude: ['proposal-dynamic-import'],
                },
              ],
              '@babel/preset-react', // 👈 Added this for JSX transformation
            ],
          },
        },
      },
      // CSS Loader
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      // SCSS/SASS Loader
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      // Image Assets
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]', // Output path for images
        },
      },
    ],
  },
  plugins: [
    // Generates index.html
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: true,
    }),
    // Module Federation Setup
    new ModuleFederationPlugin({
      name: 'core_ui',
      filename: 'remoteEntry.js',
      exposes: {
        './CoreUIApp': './src/App', // Expose main App
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^19.0.0',
          strictVersion: false,
          eager: false,
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
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'], // 👈 important
    alias: {
      src: path.resolve(__dirname, 'src/'), // Optional alias
    },
  },
};
