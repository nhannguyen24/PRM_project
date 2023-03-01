'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookingDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BookingDetail.belongsTo(models.Booking, {foreignKey: 'booking_id', targetKey: 'booking_id', as: 'booking_user'})
      BookingDetail.belongsTo(models.Field, {foreignKey: 'field_id', targetKey: 'field_id', as: 'booking_field'});
    }
  }
  BookingDetail.init({
    booking_detail_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    play_date: DataTypes.DATEONLY,
    field_price: DataTypes.DOUBLE,
    booking_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    field_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    status: {
      type: DataTypes.ENUM,
      values: ['Active', 'Deactive'],
      validate: {
        isIn: {
          args: [['Active', 'Deactive']],
          msg: 'Invalid value for booking_detail.status (Active, Deactive)'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'BookingDetail',
  });
  return BookingDetail;
};