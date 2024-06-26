"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const Umzug = require("umzug");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
  }
);

const umzug = new Umzug({
  migrations: {
    path: "./migrations",
    params: [
      sequelize.getQueryInterface(), // This is the QueryInterface
      Sequelize, // This is the DataTypes provided by Sequelize
    ],
  },
  storage: "sequelize",
  storageOptions: {
    sequelize: sequelize,
  },
});

async function runMigrations() {
  try {
    await umzug.up();
    console.log("Migrations were successful!");
  } catch (error) {
    console.error("Migration failed: ", error);
  }
}

runMigrations();
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
