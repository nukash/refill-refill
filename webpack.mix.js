// webpack.mix.js

let mix = require('laravel-mix');
const path = require("path");

mix
.webpackConfig({
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    module: {
      rules: [
        {
          test: /\.(postcss)$/,
          use: [
            'vue-style-loader',
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader', 
          ]
        },
      ]
    }
  })


.js('src/app.js', 'dist')
// .postCss('src/main.css','/')
.vue({version:2})
.setPublicPath('dist');