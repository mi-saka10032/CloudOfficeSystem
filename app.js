const Koa = require('koa')
const Router = require('koa-router')
const http = require('http');
const Static = require('koa-static')
const {Server} = require('socket.io')
const app = new Koa()
const router = new Router()

//中间件
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const debug = require('debug')('koa2:server')
const path = require('path')
const session = require('koa-session')
const cors = require('koa2-cors')
//中间件

//组件层
const routes = require('./routes')
const {keys, sessionConfig} = require('./config/session')
const {corsConfig} = require('./config/cors');
const {swaggerConfig} = require('./config/swagger');
const swagger = require('./utils/swagger')
const {koaSwagger} = require('koa2-swagger-ui')
const WS = require('./controller/websocket')
const {localhost, port} = require("./config");
//组件层

const localPort = process.env.PORT || port

//error handler
onerror(app)

app.use(Static(__dirname + '/views'))

//koa2-cors
app.use(cors(corsConfig))

//region swagger管理模块
app.use(swagger.routes(), swagger.allowedMethods())
app.use(koaSwagger(swaggerConfig))
//endregion swagger管理模块

//region session开启
app.keys = keys
app.use(session(sessionConfig, app))
//endregion

//region middlewares中间件，提供各类Content-Type验证方法、路由开启、方法允许、静态views
app.use(bodyparser())
  .use(json())
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  .use(views(path.join(__dirname, '/views'), {
    options: {settings: {views: path.join(__dirname, 'views')}},
    map: {'njk': 'nunjucks'},
    extension: 'njk'
  }))
  //开启router中间件
  .use(router.routes())
  .use(router.allowedMethods())
//endregion middlewares中间件，提供各类Content-Type验证方法、路由开启、方法允许

//region logger日志
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
})
//endregion

//region 去routes文件夹下获取路由
routes(router)
//endregion

//error监控
app.on('error', function (err, ctx) {
  console.log(err)
})

const server = http.createServer(app.callback());
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});
WS(io);

//开启端口监听
server.listen(localPort, () => {
  console.log(`Listening on ${localhost}:${localPort}`)
})
