const { Op } = require("sequelize");
const { FinancialRecord } = require("../models");

async function getRecordsByUserId(userId, page, limit, search) {
  const offset = (page - 1) * limit;
  const records = await FinancialRecord.findAndCountAll({
    where: {
      userId,
      [Op.or]: [
        { type: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ],
    },
    limit,
    offset,
  });
  return {
    total: records.count,
    records: records.rows,
    page,
    pages: Math.ceil(records.count / limit),
  };
}

async function addRecord(userId, { type, amount, description }) {
  const record = await FinancialRecord.create({
    userId,
    type,
    amount,
    description,
  });
  return record;
}

async function updateRecord(userId, id, { type, amount, description }) {
  const record = await FinancialRecord.findOne({ where: { id, userId } });
  if (!record) {
    throw new Error("Record not found or user not authorized");
  }
  record.type = type;
  record.amount = amount;
  record.description = description;
  await record.save();
  return record;
}

async function deleteRecord(userId, id) {
  const record = await FinancialRecord.findOne({ where: { id, userId } });
  if (!record) {
    throw new Error("Record not found or user not authorized");
  }
  await record.destroy();
}

module.exports = { getRecordsByUserId, addRecord, updateRecord, deleteRecord };
