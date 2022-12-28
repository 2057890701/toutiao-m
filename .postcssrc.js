module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      rootValue: function ({ file }) {
        if (/vant/i.test(file)) return 37.5
        return 75
      },
      // rootValue: 75,
      propList: ['*']
    }
  },
  exclude: {
    'postcss-pxtorem': {
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'],

      // 配置不做单位转换的资源文件名
      exclude: 'github-markdown'
    }
  }


}
