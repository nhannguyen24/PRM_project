'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Center extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Center.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: 'user_id',
        as: "center_user",
      });
      Center.hasMany(models.Field, { as: 'center_field', foreignKey: 'center_id'});
    }
  }
  Center.init({
    center_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    center_name: DataTypes.STRING,
    image: DataTypes.STRING,
    address: DataTypes.STRING,
    distance: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    open_time: DataTypes.TIME,
    close_time: DataTypes.TIME,
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    status: {
      type: DataTypes.ENUM,
      values: ['Active', 'Deactive'],
      validate: {
        isIn: {
          args: [['Active', 'Deactive']],
          msg: 'Invalid value for center.status (Active, Deactive)'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Center',
  });
  return Center;
};