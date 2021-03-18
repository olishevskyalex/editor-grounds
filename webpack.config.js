const path = require('path');

module.exports = {
  mode: "production",
  entry: {
    main: path.resolve(__dirname, './src/app.jsx'), // Точка входа.
  },
  output: {
    path: path.resolve(__dirname, './public'), // Точка выхода.
    filename: 'bundle.js', // Название бандла.
  },
  module: { // Обработка данных.
    rules: [ // Массив правил.
      {
        test: /\.jsx/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          }
        }
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              modules: {
                localIdentName: "[name]__[local]-[hash:base64:5]", //Название класса css модулей.
              },
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.s[ac]ss/,
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              modules: {
                localIdentName: "[name]__[local]-[hash:base64:5]", //Название класса css модулей.
              },
            },
          },
          'sass-loader',
        ],
        include: /\.module\.scss$/,
      },
      {
        test: /\.s[ac]ss/,
        use: [
          'style-loader', 
          'css-loader',
          'sass-loader',
        ],
        exclude: /\.module\.scss$/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  }
}