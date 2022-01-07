const template = require('./Template');
const {loginAttributes, loginTableName, login} = require('./Login');
const {adminsAttributes, adminsTableName, getAdmins} = require('./GetAdmins');
const showLists = require('./Lists');
const {GetEmMsg} = require('./Employee');
const {employeeAttributes, employeeTableName, updateEmployee} = require('./ModifyEmloyeeData');

class SqlContainer {
  AccountLogin(requestData) {
    return new Promise((resolve, reject) => {
      template(requestData, loginAttributes, loginTableName, login).then(value => {
        resolve(value);
      }).catch(error => {
        reject(error);
      })
    });
  }

  ShowLists(id) {
    return new Promise((resolve, reject) => {
      showLists(id).then(value => {
        resolve(value);
      }).catch(error => {
        reject(error);
      })
    });
  }

  GetAdmins(id) {
    return new Promise((resolve, reject) => {
      template(id, adminsAttributes, adminsTableName, getAdmins).then(value => {
        resolve(value);
      }).catch(error => {
        reject(error);
      });
    });
  }

  GetEmployeeMessage(page) {
    return new Promise((resolve, reject) => {
      GetEmMsg(page).then(value => {
        resolve(value);
      }).catch(error => {
        reject(error);
      });
    });
  }

  ModifyEmployeeMessage(modifyData) {
    return new Promise((resolve, reject) => {
      template(modifyData, employeeAttributes, employeeTableName, updateEmployee).then(value => {
        resolve(value);
      }).catch(error => {
        reject(error);
      });
    });
  }
}

module.exports = new SqlContainer();
