module.exports = {
  // swagger相关
  swaggerConfig: {
    routePrefix: '/swagger',  // host at /swagger instead of default /docs
    swaggerOptions: {
      url: '/swagger.json' // example path to json 其实就是之后swagger-jsdoc生成的文档地址
    }
  },
}
