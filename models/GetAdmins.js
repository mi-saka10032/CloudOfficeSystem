const {DataTypes, Op} = require('sequelize');
module.exports = {
  adminsAttributes: {
    name: {type: DataTypes.STRING},
    userFace: {type: DataTypes.STRING}
  },
  adminsTableName: 't_admin',
  getAdmins(admin, id) {
    return admin.findAll({
      where: {
        id: {
          [Op.ne]: id
        },
        enabled: {
          [Op.eq]: 1
        }
      }
    })
  }
}
