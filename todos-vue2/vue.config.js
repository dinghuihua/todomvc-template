
module.exports = {
  publicPath: process.env.BASE_URL,
  lintOnSave: true,
  // 打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    open: false, // 启动服务后是否打开浏览器
    // host: '127.0.0.1',
    port: 8088
    // https: false,
    // hotOnly: false,
    // 设置代理，用来解决本地开发跨域问题，如果设置了代理，本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    // proxy: 'https://baidu.com/' // 测试服务器
  }
}
