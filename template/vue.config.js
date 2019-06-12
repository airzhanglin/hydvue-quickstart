// 引用uglifyjs，代码压缩、去除console
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 引用gzip
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// gizp文件后缀
const productionGzipExtensions = ['js', 'css'];
// 强制将打包环境统一为production，统一打包后的文件夹格式
process.env.NODE_ENV = process.env.VUE_APP_ENV ? 'production' : 'development';
console.log('build evn：', process.env.VUE_APP_ENV);
console.log('build evn api base：', process.env.VUE_APP_API_BASE);
console.log('build evn static base url：', process.env.VUE_APP_BASE_URL);


module.exports = {
  // 文件基础路径（配置的阿里云静态资源路径）
  publicPath: process.env.VUE_APP_BASE_URL,
  // 输出基础路径
  outputDir: 'dist',
  indexPath: 'index.html',
  // 去除文件hash
  filenameHashing: false,
  // 配置webpack
  chainWebpack: config => {
    // 删除懒加载模块的prefetch
    config.plugins.delete('prefetch');
  },
  // 配置css
  css: {
    loaderOptions: {
      sass: {
        // 根据环境设置不同的oss图片地址，在scss中调用 _functions.scss中的oss-bg-config函数返回对应的url，本地为空，则不处理原路径
        data: `$static-url:'${process.env.VUE_APP_BASE_URL?process.env.VUE_APP_BASE_URL: ''}';`
      }
    }
  },
  // 插件及配置
  configureWebpack: {
    optimization: {
      // 压缩
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: !process.env.VUE_APP_ENV || process.env.VUE_APP_ENV === 'review',// 开发环境或review环境开启警告
            compress: {
              drop_console: process.env.VUE_APP_ENV && process.env.VUE_APP_ENV !== 'review',// 非开发环境或review环境去除console
              drop_debugger: process.env.VUE_APP_ENV && process.env.VUE_APP_ENV !== 'review',// 非开发环境或review环境去除debugger
              pure_funcs: ['console.log']//移除console
            }
          }
        })
      ]
    },
    plugins: [
      // GZIP配置
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,// gzip最小文件大小(b)
        minRatio: 0.8
      })
    ]
  },
  devServer: {
    disableHostCheck: true,
    port: 80,
    proxy: {
      '/api': {
        // target: 'http://192.168.20.28:80',
        target: 'http://114.255.42.199',
        changeOrigin: true, //改变源
        pathRewrite: {
          // '^/api': 'http://192.168.20.28:80'
          '^/api': 'http://114.255.42.199'
        }
      }
    }
  }
};