const path = require("path");
const router = require("koa-router")();
const swaggerJSDoc = require("swagger-jsdoc");
const {localhost, port} = require("../config");

const swaggerDefinition = {
  info: {
    title: '云E办网站API',
    version: '1.0.0',
    description: '为云E办前端页面提供API接口'
  },
  contact: {
    name: 'Contact Developers',
    url: 'https://mail.qq.com',
    email: '775244743@qq.com'
  },
  license: {
    name: 'Apache 2.0',
    url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
  },
  host: localhost + ':' + port,
  basePath: '/', // Base path (optional)
  schemes: ['http', 'https']
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname,'../routes/*.js')] // 写有注解的router的存放地址, 最好path.join()
};

const swaggerSpec = swaggerJSDoc(options);
//通过路由获取生成的注解文件
router.get('/swagger.json', async (ctx) => {
  ctx.set('Content-Type', 'application/json');
  ctx.body = swaggerSpec;
});
module.exports = router;
