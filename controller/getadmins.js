const Users = require('../services');

module.exports = (router) => {
  router.get('/getadminsinfo', async ctx => {
    try {
      const token = ctx.headers.authorization;
      const result = await new Users(ctx).getAdmins(token);
      const length = result && result.length ? result.length : 0;
      console.log(`获取管理员聊天信息${length}条`);
      ctx.body = result;
    }catch (error) {
      console.log(error);
      ctx.response.stats = 404;
    }
  });
};
