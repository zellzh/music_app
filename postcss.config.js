module.exports = {
  plugins: [
    require('postcss-pxtorem')({
      rootValue: 100, // 根元素字体大小
      propList: ['*'] // 需要转换的属性
    })
  ]
}
