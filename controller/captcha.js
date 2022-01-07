const Users = require('../services/index');
module.exports = (router) => {
  router.get('/captcha', async ctx => {
    const captcha = new Users(ctx);
    ctx.response.type = 'image/svg+xml;charset=utf-8';
    ctx.session = captcha.session();
    console.log(ctx.host,ctx.session);
    ctx.body = captcha.svg();
  })
}
