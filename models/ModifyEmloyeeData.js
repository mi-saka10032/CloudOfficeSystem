const {attr} = require('./Employee');
module.exports = {
  employeeAttributes: attr,
  employeeTableName: 't_employee',
  updateEmployee(employees, data) {
    const {id} = data;
    employees.update(data,{
      where: {
        id: id
      }
    })
  }
}
