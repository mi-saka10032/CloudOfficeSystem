const Users = require('../services');

module.exports = (router) => {
  router.post('/employee/emp/modify', async ctx => {
    try {
      const token = ctx.headers.authorization;
      const modifyData = ctx.request.body;
      const result = await new Users(ctx).modifyEmployeeMessage(modifyData, token);
      //修改成功的结果无需返回客户端
      console.log(result);
      ctx.body = result;
    }catch (error) {
      console.log(error);
      ctx.body = error.toString();
    }
  });
};
