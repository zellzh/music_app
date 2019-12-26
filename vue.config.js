const path = require('path')

module.exports = {
  publicPath: './',
  chainWebpack: config => {
    // config.plugins.delete('preload') // 禁用 preload

    // html-loader: 解决 html 模板字符串不解析bug
    config.module
      .rule('html')
      .test(/\.html$/)
      .exclude
        .add(/node_modules/)
        .add(/src/)
        .end() // 回到上一层节点(父节点)
      .use('html-loader')
        .loader('html-loader')
          .options({ // 创建options(修改用tap)
            minimize: true
          })

    // html-plugin
    config.plugin('html')
      .tap(args => {
        args[0].favicon = './public/favicon.ico' // 引入图标
        // args[0].inlineSource = '.(js|css)$'
        return args
      })

    // html-inline
    // config.plugin('html-inline')
    //   .use(require('html-webpack-inline-source-plugin'))

    // style-loader
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  }
}

// style-loader 自动导入 mixin / variable 样式
function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/css/mixin.scss'),
        path.resolve(__dirname, './src/assets/css/variable.scss'),
      ],
    })
}
