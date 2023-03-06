const db = require("../models");
const { Op } = require("sequelize");

const getAllFields = ({ page, limit, order, field_name, ...query }) =>
  new Promise(async (resolve, reject) => {
    try {
      const queries = { raw: true, nest: true };
      const offset = !page || +page <= 1 ? 0 : +page - 1;
      const flimit = +limit || +process.env.LIMIT_POST;
      queries.offset = offset * flimit;
      queries.limit = flimit;
      if (order) queries.order = [order];
      if (field_name) query.field_name = { [Op.substring]: field_name };

      const fields = await db.Field.findAndCountAll({
        where: query,
        ...queries,
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
          ],
        },
        include: [
          {
            model: db.Center,
            as: "field_center",
            attributes: {
              exclude: [
                "status",
                "createdAt",
                "updatedAt",
              ],
            },
          },
          {
            model: db.FieldType,
            as: "field_type",
            attributes: {
              exclude: [
                "status",
                "createdAt",
                "updatedAt",
              ],
            },
          },
        ],
      });
      resolve({
        msg: fields ? `Got field` : "Cannot find field",
        fields: fields,
      });
    } catch (error) {
      reject(error);
    }
  });

const createField = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const fields = await db.Field.findOrCreate({
        where: { field_name: body?.field_name },
        defaults: {
          ...body,
        },
      });
      resolve({
        msg: fields[1]
          ? "Create new field successfully"
          : "Cannot create new field/Field's name already had",
      });
    } catch (error) {
      reject(error);
    }
  });

const deleteField = (field_ids) =>
  new Promise(async (resolve, reject) => {
    try {
      const fields = await db.Field.update(
        { status: "Deactive" },
        {
          where: { field_id: field_ids },
        }
      );
      resolve({
        msg:
          fields > 0
            ? `${fields} field is deleted`
            : "Cannot delete field/field_id not found",
      });
    } catch (error) {
      reject(error);
    }
  });

const getFieldById = (field_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const field = await db.Field.findOne({
        where: { field_id: field_id },
        raw: true,
        nest: true,
        attributes: {
          exclude: [
            "createAt",
            "updateAt",
          ],
        },
        include: [
          {
            model: db.Center,
            as: "field_center",
            attributes: {
              exclude: [
                "status",
                "createdAt",
                "updatedAt",
              ],
            },
          },
          {
            model: db.FieldType,
            as: "field_type",
            attributes: {
              exclude: [
                "status",
                "createdAt",
                "updatedAt",
              ],
            },
          },
        ],
      });
      if (field) {
        resolve({
          field: field,
        });
      } else {
        resolve({
          msg: `Cannot find field with id: ${field_id}`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });

  const updateField = ({ field_id, ...body }) =>
  new Promise(async (resolve, reject) => {
    try {
      const fields = await db.Field.update(body, {
        where: { field_id },
      });
      resolve({
        msg:
          fields[0] > 0
            ? `${fields[0]} field update`
            : "Cannot update field/ field_id not found",
      });
    } catch (error) {
      reject(error.message);
    }
  });

module.exports = {
  getAllFields,
  createField,
  deleteField,
  getFieldById,
  updateField
};
