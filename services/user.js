const db = require("../models");
const { Op } = require("sequelize");

const getAllUser = ({ page, limit, order, user_name, ...query }) =>
  new Promise(async (resolve, reject) => {
    try {
          const queries = { raw: true, nest: true };
          const offset = !page || +page <= 1 ? 0 : +page - 1;
          const flimit = +limit || +process.env.LIMIT_POST;
          queries.offset = offset * flimit;
          queries.limit = flimit;
          if (order) queries.order = [order];
          if (user_name) query.user_name = { [Op.substring]: user_name };

          const users = await db.User.findAndCountAll({
            where: query,
            ...queries,
            attributes: {
              exclude: [
                "password",
                "status",
                "role_id",
                "major_id",
                "createAt",
                "updateAt",
                "refresh_token",
              ],
            },
            include: [
              {
                model: db.Role,
                as: "user_role",
                attributes: ["role_id", "role_name"],
              },
            ],
          });
          resolve({
            msg: users ? `Got user` : "Cannot find user",
            users: users,
          });
    } catch (error) {
      reject(error);
    }
  });

const updateUser = ({ user_id, ...body }) =>
  new Promise(async (resolve, reject) => {
    try {
      const users = await db.User.update(body, {
        where: { user_id },
      });
      resolve({
        msg:
          users[0] > 0
            ? `${users[0]} user update`
            : "Cannot update user/ user_id not found",
      });
    } catch (error) {
      reject(error.message);
    }
  });

const deleteUser = (user_ids, user_id) =>
  new Promise(async (resolve, reject) => {
    try {
      if (user_ids.includes(user_id)) {
        resolve({
          msg: "Cannot delete user/ Account is in use",
        });
      } else {
      const users = await db.User.update(
        { status: "Deactive" },
        {
          where: { user_id: user_ids },
        }
      );
      resolve({
        msg:
          users > 0
            ? `${users} user delete`
            : "Cannot delete user/ user_id not found",
      });
    };
    } catch (error) {
      reject(error);
    }
  });

const getUserById = (user_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { user_id: user_id },
        raw: true,
        nest: true,
        attributes: {
          exclude: [
            "password",
            "role_id",
            "major_id",
            "createdAt",
            "updatedAt",
            "refresh_token",
          ],
        },
        include: [
          {
            model: db.Role,
            as: "user_role",
            attributes: ["role_id", "role_name"],
          },
        ],
      });
      if (user) {
        resolve({
          user: user,
        });
      } else {
        resolve({
          msg: `Cannot find user with id: ${user_id}`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  getAllUser,
  updateUser,
  deleteUser,
  getUserById,
};
