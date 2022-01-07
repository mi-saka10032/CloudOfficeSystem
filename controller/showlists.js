const Users = require('../services');

module.exports = (router) => {
  router.get('/system/config/menu', async (ctx) => {
    try {
      const token = ctx.headers.authorization;
      const result = await new Users(ctx).showLists(token);
      const length = result && result.length ? result.length : 0;
      console.log(`返回${length}个结果`);
      ctx.body = result;
    }catch (error) {
      console.log(error);
      ctx.response.status = 404;
      ctx.body = error.toString();
    }
  });
}
