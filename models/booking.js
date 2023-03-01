'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: 'user_id',
        as: "booking_user",
      });
      Booking.belongsToMany(models.User, {through: models.BookingDetail });
      Booking.hasMany(models.BookingDetail, {as: "booking_bookingDetail", foreignKey: 'booking_id'});
    }
  }
  Booking.init({
    booking_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    booking_date: DataTypes.DATEONLY,
    total_price: DataTypes.DOUBLE,
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
          msg: 'Invalid value for booking.status (Active, Deactive)'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};