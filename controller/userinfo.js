const Users = require('../services');
module.exports = (router) => {
  router.get('/userinfo', async (ctx) => {
    try {
      const token = ctx.headers.authorization;
      const result = await new Users(ctx).userInfo(token);
      console.log('用户信息返回成功');
      ctx.body = result;
    } catch (error) {
      console.log(error);
      ctx.response.status = 404;
    }
  })
}
