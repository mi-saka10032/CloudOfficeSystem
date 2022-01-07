const {Sequelize} = require('sequelize');
const {database, root, password, mysqlConfig} = require('../config/mysql');

module.exports = async function template(requestData, attributes, tableName, SQLFunction) {
  try {
    //创建sequelize实例
    const sequelize = new Sequelize(database, root, password, mysqlConfig);
    //创建sql表格关联的映射对象
    const template = sequelize.define('Template', attributes, {
      sequelize,
      tableName,
      timestamps: false
    });
    //执行SQL语句函数，传入对象与请求数据，若没有异常则返回成功的promise对象
    return await SQLFunction(template, requestData);
  } catch (error) {
    //错误返回失败的promise对象
    return error;
  }
}
