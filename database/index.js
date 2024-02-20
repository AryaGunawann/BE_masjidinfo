require("dotenv").config();

const mysql = require("mysql2/promise");

const {
  MYSQL_ADDON_HOST,
  MYSQL_ADDON_DB,
  MYSQL_ADDON_USER,
  MYSQL_ADDON_PORT,
  MYSQL_ADDON_PASSWORD,
} = process.env;

const dbConfig = {
  host: MYSQL_ADDON_HOST,
  user: MYSQL_ADDON_USER,
  password: MYSQL_ADDON_PASSWORD,
  database: MYSQL_ADDON_DB,
  port: MYSQL_ADDON_PORT,
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;
