const Login = require('../services');

module.exports = (router) => {
  router.post('/login', async (ctx, next) => {
    try {
      const req = ctx.request.body;
      const result = await new Login(ctx).login(req,ctx.session);
      console.log(result.message);
      ctx.body = result;
    }catch (e) {
      console.log(e);
      ctx.response.status = 404;
    }
  })
}
