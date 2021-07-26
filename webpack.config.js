var path = require('path')
var webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader');
const baseModule = {
  rules: [
    {
      test: /\.css$/,
      use: [
        'vue-style-loader',
        'css-loader'
      ],
    },
    {
      test: /\.less$/,
      use: [
        'vue-style-loader',
        'css-loader',
        'less-loader'
      ]
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
        }
        // other vue-loader options go here
      }
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]?[hash]'
      }
    }
  ]
}

const basePlugins = [
  new VueLoaderPlugin(),
]

module.exports = [
  {
    mode: 'development',
    entry: {
      'build': './demo/main.js'
    },
    output: {
      path: path.resolve(__dirname, './demo'),
      publicPath: '/demo/',
      filename: '[name].js'
    },
    module: baseModule,
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      },
      extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
      historyApiFallback: true,
      noInfo: true,
      overlay: true,
      host: '0.0.0.0',
      disableHostCheck: true,
    },
    devtool: 'eval-source-map',
    plugins: basePlugins,
  },
  {
    mode: 'production',
    entry: {
      'uploader': './src/index.js',
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/dist/',
      filename: '[name].js',
      library: 'vux-uploader-component',
      libraryTarget: 'umd',
    },
    module: baseModule,
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      },
      extensions: ['*', '.js', '.vue', '.json']
    },
    externals: {
      'vue': 'Vue',
    },
    plugins: [
      ...basePlugins,
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    ]
  }
]

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = 'source-map';

  module.exports.entry = {
    'uploader': './src/index.js',
  };
  module.exports.output = {

  };

  module.exports.resolve = {

  };

  module.exports.externals = {
    'vue': 'Vue',
  };
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true,
    //   compress: {
    //     warnings: false
    //   }
    // }),

  ])
}
