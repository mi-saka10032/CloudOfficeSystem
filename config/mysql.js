const { localhost } = require('./index')
module.exports = {
  database: 'cloudework',
  root: 'root',
  password: 'Yzh123456.',
  mysqlConfig: {
    host: localhost,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
}
