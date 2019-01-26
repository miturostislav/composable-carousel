const path = require('path');
const webpack = require('webpack');

module.exports = env => {
  const isProduction = !!env.production;
  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/carousel.js',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'carousel.min.js',
      library: 'Accessible Carousel',
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
