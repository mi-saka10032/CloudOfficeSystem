const {Sequelize, DataTypes, Op} = require('sequelize');
const {database, root, password, mysqlConfig} = require('../config/mysql');
const sequelize = new Sequelize(database, root, password, mysqlConfig);

const attr = {
  name: {type: DataTypes.STRING},
  gender: {type: DataTypes.STRING},
  birthday: {type: DataTypes.DATEONLY},
  idCard: {type: DataTypes.STRING},
  wedlock: {type: DataTypes.ENUM('未婚', '已婚', '离异')},
  nationId: {type: DataTypes.INTEGER},
  nativePlace: {type: DataTypes.STRING},
  politicId: {type: DataTypes.INTEGER},
  email: {type: DataTypes.STRING},
  phone: {type: DataTypes.STRING},
  address: {type: DataTypes.STRING},
  departmentId: {type: DataTypes.INTEGER},
  jobLevelId: {type: DataTypes.INTEGER},
  posId: {type: DataTypes.INTEGER},
  engageForm: {type: DataTypes.STRING},
  tiptopDegree: {type: DataTypes.ENUM('劳动合同', '劳务合同')},
  specialty: {type: DataTypes.STRING},
  school: {type: DataTypes.STRING},
  beginDate: {type: DataTypes.DATEONLY},
  workState: {type: DataTypes.ENUM('在职', '离职')},
  workID: {type: DataTypes.STRING},
  contractTerm: {type: DataTypes.DOUBLE},
  conversionTime: {type: DataTypes.DATEONLY},
  notWorkDate: {type: DataTypes.DATEONLY},
  beginContract: {type: DataTypes.DATEONLY},
  endContract: {type: DataTypes.DATEONLY},
  workAge: {type: DataTypes.INTEGER},
  salaryId: {type: DataTypes.INTEGER}
};

const Employee = sequelize.define('employee', attr, {
  sequelize,
  tableName: 't_employee',
  timestamps: false
});

const Nation = sequelize.define('nation', {
  name: {type: DataTypes.STRING}
}, {
  sequelize,
  tableName: 't_nation',
  timestamps: false
});

const Politics = sequelize.define('politics', {
  name: {type: DataTypes.STRING},
}, {
  sequelize,
  tableName: 't_politics_status',
  timestamps: false
});

const Department = sequelize.define('department', {
  name: {type: DataTypes.STRING}
}, {
  sequelize,
  tableName: 't_department',
  timestamps: false
});

const Joblevel = sequelize.define('joblevel', {
  name: {type: DataTypes.STRING}
}, {
  sequelize,
  tableName: 't_joblevel',
  timestamps: false
});

const Position = sequelize.define('position', {
  name: {type: DataTypes.STRING}
}, {
  sequelize,
  tableName: 't_position',
  timestamps: false
});

Employee.belongsTo(Nation, {foreignKey: 'nationId'});
Employee.belongsTo(Politics, {foreignKey: 'politicId'});
Employee.belongsTo(Department, {foreignKey: 'departmentId'});
Employee.belongsTo(Joblevel, {foreignKey: 'jobLevelId'});
Employee.belongsTo(Position, {foreignKey: 'posId'});

function ArrayExec(data) {
  if (!(data instanceof Array) || data.length === 0) return [];
  let container = [];
  for (const item of data) {
    container.push(ObjectExec(item));
  }
  return container;
}

function ObjectExec(item) {
  let tempObj = {};
  for (const key in item) {
    if (key === 'dataValues' && (item[key] instanceof Object)) {
      const dataValues = item[key];
      for (const valueKey in dataValues) {
        if (!(dataValues[valueKey] instanceof Object)) {
          tempObj[valueKey] = dataValues[valueKey];
        } else {
          tempObj[valueKey] = ObjectExec(dataValues[valueKey]);
        }
      }
    }
  }
  return tempObj;
}

module.exports = {
  attr,
  GetEmMsg: async function GetEmMsg(page) {
    const result = await Employee.findAll({
      include: [
        {model: Nation},
        {model: Politics},
        {model: Department},
        {model: Joblevel},
        {model: Position}
      ],
      /*    limit: 10,
          offset: page*/
    });
    return ArrayExec(result);
  }
}

