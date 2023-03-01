'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: "role_id",
        targetKey: 'role_id',
        as: "user_role",
      });
      User.hasMany(models.Center, { as: 'user_center', foreignKey: 'user_id'});
      User.hasMany(models.Booking, { as: 'user_booking', foreignKey: 'user_id'});
    }
  }
  User.init({
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.INTEGER(10),
    role_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    status: {
      type: DataTypes.ENUM,
      values: ["Active", "Deactive"],
      validate: {
        isIn: {
          args: [['Active', 'Deactive']],
          msg: 'Invalid value for student.status (Active, Deactive)'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};