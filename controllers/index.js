const {login, register} = require("./auth");
const {getAllUser, updateUser, deleteUser, getUserById} = require("./user");
const {getAllRoles} = require('./role')
const {getAllFields, createField, deleteField, getFieldById, updateField} = require('./field')

module.exports = {
  login,
  register,
  getAllUser,
  updateUser, 
  deleteUser,
  getAllRoles,
  getUserById,
  getAllFields,
  createField,
  deleteField,
  getFieldById,
  updateField
};
