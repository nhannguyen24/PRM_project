const {login, register} = require("./auth");
const {getAllUser, updateUser, deleteUser, getUserById} = require("./user");
const {getAllRoles} = require('./role')

module.exports = {
  login,
  register,
  getAllUser,
  updateUser, 
  deleteUser,
  getAllRoles,
  getUserById,
};
