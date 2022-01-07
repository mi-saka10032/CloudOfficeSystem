const users = require('../controller/login')
const captcha = require('../controller/captcha')
const showLists = require('../controller/showlists')
const userInfo = require('../controller/userinfo')
const getEmMsg = require('../controller/getemmsg');
const modifyEmMsg = require('../controller/modifyemmsg');
const getAdmins = require('../controller/getadmins');

module.exports = (router) => {
  captcha(router);
  users(router);
  showLists(router);
  userInfo(router);
  getEmMsg(router);
  modifyEmMsg(router);
  getAdmins(router);
}
