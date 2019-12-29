module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // 强制语句结束添加，分号
    // semi: ["error", "always"],
    // 空行规则 --- max: 最大空行;  maxBOF: 开头最大空行; maxEOF: 结尾最大空行
    'no-multiple-empty-lines' : ["error", { "max": 2, "maxBOF": 1, "maxEOF": 1 }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
