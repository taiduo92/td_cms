module.exports = {
    baseUrl:'/dist',
    devServer: {
      // 自动打开浏览器
      open: true, 
      //配置代理
      proxy: 'http://qc-res.oss-cn-hangzhou.aliyuncs.com',
      // 是否启用https
      // https: true, 
    },
}
