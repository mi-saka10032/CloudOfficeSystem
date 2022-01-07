const sqlContainer = require('../models/Index');
const respBean = require('../config/menuRole');
//token相关
const tokenGenerate = require('../utils/ssh/TokenGenerator');
const tokenVerification = require('../utils/ssh/TokenVerify');
//token相关
const getClientIP = require("../utils/getClientIP");
const svgCaptcha = require("svg-captcha");
const {verifyCode} = require("../config/captcha");

module.exports = class Users {
  constructor(ctx) {
    this._ctx = ctx;
  }

  ipKey() {
    return getClientIP(this._ctx.req);
  }

  session() {
    const ipKey = this.ipKey();
    this.captcha = svgCaptcha.create(verifyCode);
    return {
      [ipKey]: this.captcha.text.toLowerCase() //存session用于验证接口获取文字码
    }
  }

  svg() {
    return this.captcha.data;
  }

  //登录函数
  login(account) {
    //处理code变为小写
    const {code} = account;
    const ipKey = this.ipKey();
    if ((typeof code === 'string') && code.toLowerCase() !== this._ctx.session[ipKey]) return Promise.resolve(respBean.error('验证码错误，请重新输入验证码！', null));
    return new Promise((resolve, reject) => {
      sqlContainer.AccountLogin(account).then(async value => {
        //value不为null或undefined，取出dataValues的值，生成token返回成功信息
        console.log(value);
        if (value) {
          const data = value.dataValues;
          const token = await tokenGenerate(data);
          resolve(respBean.success('登录成功！', {tokenHead: "Bearer", token}));
        } else resolve(respBean.error('用户名或密码错误，请重新输入！', null))
      }).catch(error => {
        reject(error)
      });
    })
  }

  //token解密成功后调用，token没过期返回真，过期返回假
  expVery(tokenObj) {
    return tokenObj.exp && (tokenObj.exp - parseInt(new Date().getTime() / 1000)) > 0;
  }

  //token验证封装
  async tokenVery(token) {
    try {
      const tokenObj = await tokenVerification(token);
      if (this.expVery(tokenObj)) return Promise.resolve(tokenObj);
      else return Promise.reject(respBean.error('令牌已过期，请重新登录', null));
    } catch (error) {
      return Promise.reject(respBean.error(error.toString(), null));
    }
  }

  //获取菜单路由数组
  showLists(token) {
    //先做token验证
    return new Promise(async (resolve, reject) => {
      try {
        const tokenObj = await this.tokenVery(token);
        const value = await sqlContainer.ShowLists(tokenObj.id);
        resolve(value);
      } catch (error) {
        reject(error);
      }
    })
  }

  //获取管理员头像和名字
  userInfo(token) {
    //token验证
    return new Promise(async (resolve, reject) => {
      try {
        const tokenObj = await this.tokenVery(token);
        const {name, userFace} = tokenObj;
        resolve({name, userFace});
      } catch (error) {
        reject(error);
      }
    });
  }

  //获取除当前管理员之外的其他管理员头像和名称
  getAdmins(token) {
    return new Promise(async (resolve, reject) => {
      try {
        const tokenObj = await this.tokenVery(token);
        const {id} = tokenObj;
        const value = await sqlContainer.GetAdmins(id);
        resolve(value);
      }catch (error) {
        reject(error);
      }
    });
  }

  //获取员工信息数组
  getEmployeeMessage(page) {
    return new Promise(async (resolve, reject) => {
      try {
        page = (page instanceof Number) ? page - 1 : 0;
        const value = await sqlContainer.GetEmployeeMessage(page);
        resolve(value);
      } catch (error) {
        reject(error);
      }
    });
  }

  //修改员工个人信息
  modifyEmployeeMessage(modifyData, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const {id} = modifyData;
        if (!id) reject('未收到员工id信息，修改失败！');
        await this.tokenVery(token);
        await sqlContainer.ModifyEmployeeMessage(modifyData);
        resolve(respBean.success('修改成功', null));
      } catch (error) {
        reject(error);
      }
    });
  }
}
