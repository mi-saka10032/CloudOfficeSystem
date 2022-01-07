const {Sequelize, QueryTypes} = require('sequelize');
const {database, root, password, mysqlConfig} = require('../config/mysql');
const sequelize = new Sequelize(database, root, password, mysqlConfig);

const options = `SELECT DISTINCT m1.*, m2.id AS id2, m2.url AS url2, m2.path AS path2, m2.component AS component2, m2.name AS name2, m2.iconCls AS iconCls2,
                m2.keepAlive AS keepAlive2, m2.requireAuth AS requireAuth2, m2.parentId as parentId2, m2.enabled as enabled2
                FROM t_menu m1, t_menu m2, t_admin_role ar, t_menu_role mr
                WHERE m1.id = m2.parentId AND m2.id = mr.mid AND mr.rid = ar.rid AND ar.adminId = :adminId AND m2.enabled = 1`;

module.exports = async function showList(id) {
  const result = await sequelize.query(options, {replacements: {adminId: id}, type: QueryTypes.SELECT});
  //如果未找到，数组长度为0
  if (!result.length) return null;
  //拆分对象中的key，前一半key键名和后一半key键名
  let keys = Object.keys(result[0]);
  let keys1 = keys.slice(0, keys.length / 2);
  let keys2 = keys.slice(keys.length / 2);
  //声明接收新数据的数组，存储唯一名字的对象
  let tempData = [];
  let names = {};
  for (let i = 0; i < result.length; i++) {
    const temp = Object.assign(result[i]);
    names[result[i].name] = true;
    let dad = {};
    let children = {};
    for (let j = 0; j < keys1.length; j++) {
      dad[keys1[j]] = temp[keys1[j]];
      children[keys1[j]] = temp[keys2[j]];
    }
    tempData.push({...dad, children});
  }
  let data = [];
  for (const na in names) {
    let obj = {};
    let arr = [];
    for (const temp of tempData) {
      if (na === temp.name) {
        obj = Object.assign(temp);
        arr.push(temp.children);
      }
    }
    data.push({...obj, children: arr});
  }
  return data;
}
