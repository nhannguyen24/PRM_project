'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Field extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Field.belongsTo(models.Center, {
        foreignKey: "center_id",
        targetKey: 'center_id',
        as: "field_center",
      });
      Field.belongsTo(models.FieldType, {
        foreignKey: "field_type_id",
        targetKey: 'field_type_id',
        as: "field_type",
      });
      Field.belongsToMany(models.Booking, {through: models.BookingDetail});
      Field.hasMany(models.BookingDetail, {as: "field_bookingDetail", foreignKey: 'field_id'});
    }
  }
  Field.init({
    field_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    field_name: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    available_slot: DataTypes.STRING,
    center_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    field_type_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    status: {
      type: DataTypes.ENUM,
      values: ['Active', 'Deactive'],
      validate: {
        isIn: {
          args: [['Active', 'Deactive']],
          msg: 'Invalid value for field.status (Active, Deactive)'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Field',
  });
  return Field;
};