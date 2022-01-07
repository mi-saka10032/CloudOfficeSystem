const {DataTypes, Op} = require('sequelize');
module.exports = {
  loginAttributes: {
    name: {type: DataTypes.STRING},
    username: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    userFace: {type: DataTypes.STRING}
  },
  loginTableName: 't_admin',
  login(admin, data) {
    const {username, password} = data;
    return admin.findOne({
      where: {
        username: {
          [Op.eq]: username
        },
        password: {
          [Op.eq]: password
        },
        enabled: {
          [Op.eq]: 1
        }
      }
    })
  }
}
