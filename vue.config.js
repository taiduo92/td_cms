module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? 'td_cms.github.io/dist/' : '/',
    devServer: {
      // 自动打开浏览器
      open: true, 
      //配置代理
      proxy: 'http://qc-res.oss-cn-hangzhou.aliyuncs.com',
      // 是否启用https
      // https: true, 
    },
    chainWebpack(config) {
      config.output.filename('[name].[hash].js').end();
    },
    // filenameHashing: true,
}