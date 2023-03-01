'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FieldType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FieldType.hasMany(models.Field, { as: 'type_field', foreignKey: 'field_type_id'});
    }
  }
  FieldType.init({
    field_type_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    field_type_name: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: ['Active', 'Deactive'],
      validate: {
        isIn: {
          args: [['Active', 'Deactive']],
          msg: 'Invalid value for field_type.status (Active, Deactive)'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'FieldType',
  });
  return FieldType;
};