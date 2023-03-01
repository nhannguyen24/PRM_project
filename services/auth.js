require("dotenv").config();
const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8));

const register = ({ email, password, address, phone }) => new Promise(async (resolve, reject) => {
  try {
      const response = await db.User.findOrCreate({
          where: { email },
          defaults: {
              email,
              password: hashPassword(password),
              address,
              phone,
              user_name: email,
              avatar: 'https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg',
              role_id: '6fefdcdd-6ea3-46b7-8a9b-a1b048d73fe1',
          }
      })
      resolve({
          mes: response[1] ? 'Register is successfully' : 'Email has already used',
      })
  } catch (error) {
      reject(error)
  }
})

const login = ({ email, password }) => new Promise(async (resolve, reject) => {
  try {
      const response = await db.User.findOne({
          where: { email },
          raw: true,
          nest: true,
          attributes: {
            exclude: ["role_id", "status", "createdAt", "updatedAt", "major_id"],
          },
          include: [
            {
              model: db.Role,
              as: "user_role",
              attributes: ["role_id", "role_name"],
            },
          ],
      })
      const isChecked = response && bcrypt.compareSync(password, response.password)
      const accessToken = isChecked
          ? jwt.sign({ user_id: response.user_id,
            email: response.email,
            role_name: response.user_role.role_name}, process.env.JWT_SECRET, { expiresIn: '1h' })
          : null

      resolve({
          mes: accessToken ? 'Login is successfully' : response ? 'Password is wrong' : 'Not found account',
          'access_token': accessToken ? `Bearer ${accessToken}` : accessToken,
          user: response,
      })
  } catch (error) {
      reject(error)
  }
})

module.exports = { login, register }; 
