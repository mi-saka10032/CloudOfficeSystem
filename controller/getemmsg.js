const Users = require('../services');

module.exports = (router) => {
  router.get('/employee/emp/basic', async ctx => {
    try {
      let {page} = ctx.request.query;
      const result = await new Users(ctx).getEmployeeMessage(Number(page));
      const length = result && result.length ? result.length : 0;
      console.log(`返回${length}个结果`);
      ctx.body = result;
    }catch (error) {
      console.log(error);
      ctx.response.status = 404;
    }
  });
};
