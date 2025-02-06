"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTables = void 0;
var _require = require("../database"),
  initDatabase = _require.initDatabase;
var createTables = exports.createTables = function createTables() {
  var db = initDatabase();
  console.log("🔄 Creating Tables...");
  db.exec("\n        CREATE TABLE IF NOT EXISTS \"bank\" ( \"id\" INTEGER NOT NULL UNIQUE, \"name\"\n        TEXT UNIQUE, \"telephone\" TEXT, \"createdAt\" DATETIME DEFAULT\n        CURRENT_TIMESTAMP, \"updatedAt\" DATETIME DEFAULT\n        CURRENT_TIMESTAMP, PRIMARY KEY(\"id\" AUTOINCREMENT));\n        \n        CREATE TABLE IF NOT EXISTS \"bank_account\" ( \"id\" INTEGER NOT NULL UNIQUE,\n        \"account_number\" TEXT NOT NULL UNIQUE, \"account_holder_name\"\n        TEXT, \"currency_type\" INTEGER, \"bank\" INTEGER, \"createdAt\"\n        DATETIME DEFAULT CURRENT_TIMESTAMP, \"updatedAt\" DATETIME\n        DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(\"id\" AUTOINCREMENT),\n        FOREIGN KEY(\"bank\") REFERENCES \"bank\"(\"id\"), FOREIGN\n        KEY(\"currency_type\") REFERENCES \"currency_type\"(\"id\"));\n        \n        CREATE TABLE IF NOT EXISTS \"cardex\" ( \"id\" INTEGER NOT NULL UNIQUE,\n        \"description\" TEXT NOT NULL, \"amount\" INTEGER, \"balance\"\n        NUMERIC, \"addressee\" TEXT, \"date\" DATETIME, \"document\"\n        INTEGER, PRIMARY KEY(\"id\" AUTOINCREMENT), FOREIGN\n        KEY(\"document\") REFERENCES \"document\"(\"id\") );\n        \n        CREATE TABLE IF NOT EXISTS \"client\" ( \"id\" INTEGER NOT NULL UNIQUE, \"name\"\n        TEXT NOT NULL, \"address\" TEXT, \"identification\" TEXT NOT\n        NULL UNIQUE, \"cellphone\" TEXT, \"credit_apply\" INTEGER\n        DEFAULT 1, \"max_credit\" NUMERIC, \"credit_currency\" INTEGER,\n        \"createdBy\" INTEGER, \"department\" INTEGER, \"seller\"\n        INTEGER, \"createdAt\" DATETIME DEFAULT CURRENT_TIMESTAMP,\n        \"updatedAt\" DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY\n        KEY(\"id\" AUTOINCREMENT), FOREIGN KEY(\"createdBy\") REFERENCES\n        \"user\"(\"id\"), FOREIGN KEY(\"credit_currency\") REFERENCES\n        \"currency_type\"(\"id\"), FOREIGN KEY(\"department\") REFERENCES\n        \"department\"(\"id\"), FOREIGN KEY(\"seller\") REFERENCES\n        \"seller\"(\"id\"));\n        \n        CREATE TABLE IF NOT EXISTS \"currency_type\" ( \"id\" INTEGER NOT NULL UNIQUE,\n        \"name\" INTEGER NOT NULL UNIQUE, \"symbol\" INTEGER NOT NULL,\n        \"exchange_rate\" INTEGER NOT NULL, \"createdAt\" DATETIME\n        DEFAULT CURRENT_TIMESTAMP, \"updatedAt\" DATETIME DEFAULT\n        CURRENT_TIMESTAMP, PRIMARY KEY(\"id\" AUTOINCREMENT) );\n        \n        CREATE TABLE IF NOT EXISTS \"department\" ( \"id\" INTEGER NOT NULL UNIQUE,\n        \"name\" TEXT NOT NULL UNIQUE, \"createdAt\" DATETIME DEFAULT\n        CURRENT_TIMESTAMP, \"updatedAt\" DATETIME DEFAULT\n        CURRENT_TIMESTAMP, PRIMARY KEY(\"id\" AUTOINCREMENT) );\n        \n        CREATE TABLE IF NOT EXISTS \"document\" ( \"id\" INTEGER NOT NULL UNIQUE,\n        \"name\" INTEGER NOT NULL UNIQUE, \"createdAt\" DATETIME DEFAULT\n        CURRENT_TIMESTAMP, \"updatedAt\" DATETIME DEFAULT\n        CURRENT_TIMESTAMP, PRIMARY KEY(\"id\" AUTOINCREMENT) );\n        \n        CREATE TABLE IF NOT EXISTS \"invoice\" ( \"id\" INTEGER NOT NULL UNIQUE,\n        \"number\" TEXT NOT NULL UNIQUE, \"date\" DATETIME NOT NULL\n        DEFAULT CURRENT_TIMESTAMP, \"total\" NUMERIC, \"discount\"\n        NUMERIC, \"iva\" NUMERIC, \"discount_applied\" NUMERIC, \"note\"\n        TEXT, \"net\" NUMERIC, \"quote\" TEXT, \"payment_method\" INTEGER,\n        \"currency_type\" INTEGER, \"status\" INTEGER, \"client\" INTEGER,\n        \"seller\" INTEGER, \"bank_account\" INTEGER, \"invoice_type\"\n        INTEGER, \"createdBy\" INTEGER, \"createdAt\" DATETIME DEFAULT\n        CURRENT_TIMESTAMP, \"updatedAt\" DATETIME DEFAULT\n        CURRENT_TIMESTAMP, PRIMARY KEY(\"id\" AUTOINCREMENT), FOREIGN\n        KEY(\"bank_account\") REFERENCES \"bank_account\"(\"id\"), FOREIGN\n        KEY(\"client\") REFERENCES \"client\"(\"id\"), FOREIGN\n        KEY(\"createdBy\") REFERENCES \"user\"(\"id\"), FOREIGN\n        KEY(\"currency_type\") REFERENCES \"currency_type\"(\"id\"),\n        FOREIGN KEY(\"invoice_type\") REFERENCES \"invoice_type\"(\"id\"),\n        FOREIGN KEY(\"payment_method\") REFERENCES\n        \"payment_method\"(\"id\"), FOREIGN KEY(\"seller\") REFERENCES\n        \"seller\"(\"id\"), FOREIGN KEY(\"status\") REFERENCES\n        \"status\"(\"id\") );\n        \n        CREATE TABLE IF NOT EXISTS \"invoice_detail\" ( \"id\" INTEGER NOT NULL\n        UNIQUE, \"unit_price\" NUMERIC, \"amount\" NUMERIC, \"discount\"\n        NUMERIC, \"discount_percent\" NUMERIC, \"iva\" NUMERIC,\n        \"subtotal\" NUMERIC, \"measurement_unit\" INTEGER, \"product\"\n        INTEGER, \"invoice\" INTEGER, \"createdAt\" DATETIME DEFAULT\n        CURRENT_TIMESTAMP, \"updatedAt\" DATETIME DEFAULT\n        CURRENT_TIMESTAMP, PRIMARY KEY(\"id\" AUTOINCREMENT), FOREIGN\n        KEY(\"invoice\") REFERENCES \"invoice\"(\"id\"), FOREIGN\n        KEY(\"measurement_unit\") REFERENCES \"measurement_unit\"(\"id\"),\n        FOREIGN KEY(\"product\") REFERENCES \"product\"(\"id\") );\n        \n        CREATE TABLE IF NOT EXISTS \"invoice_type\" ( \"id\" INTEGER NOT NULL UNIQUE,\n        \"name\" INTEGER NOT NULL, \"createdAt\" DATETIME DEFAULT\n        CURRENT_TIMESTAMP, \"updatedAt\" DATETIME DEFAULT\n        CURRENT_TIMESTAMP, PRIMARY KEY(\"id\" AUTOINCREMENT) );\n        \n        CREATE TABLE IF NOT EXISTS \"measurement_unit\" ( \"id\" INTEGER NOT NULL\n        UNIQUE, \"name\" INTEGER NOT NULL UNIQUE, \"createdAt\" DATETIME\n        DEFAULT CURRENT_TIMESTAMP, \"updatedAt\" DATETIME DEFAULT\n        CURRENT_TIMESTAMP, PRIMARY KEY(\"id\" AUTOINCREMENT) );\n        \n        CREATE TABLE IF NOT EXISTS \"payment_method\" ( \"id\" INTEGER NOT NULL\n        UNIQUE, \"name\" TEXT NOT NULL, \"createdAt\" DATETIME DEFAULT\n        CURRENT_TIMESTAMP, \"updatedAt\" DATETIME DEFAULT\n        CURRENT_TIMESTAMP, PRIMARY KEY(\"id\" AUTOINCREMENT) );\n        \n        CREATE TABLE IF NOT EXISTS \"product\" ( \"id\" INTEGER NOT NULL UNIQUE,\n        \"name\" TEXT NOT NULL, \"price\" NUMERIC, \"description\" TEXT,\n        \"iva\" NUMERIC, \"net\" NUMERIC, \"quantity\" NUMERIC, \"life\"\n        INTEGER, \"countable\" INTEGER DEFAULT 1, \"combo\" INTEGER\n        DEFAULT 0, \"currency_type\" INTEGER, \"measurement_unit\"\n        INTEGER, \"entry\" INTEGER, \"category\" INTEGER, \"warehouse\"\n        INTEGER, \"createdAt\" DATETIME DEFAULT CURRENT_TIMESTAMP,\n        \"updatedAt\" DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY\n        KEY(\"id\" AUTOINCREMENT), FOREIGN KEY(\"category\") REFERENCES\n        \"product_category\"(\"id\"), FOREIGN KEY(\"currency_type\")\n        REFERENCES \"currency_type\"(\"id\"), FOREIGN KEY(\"entry\")\n        REFERENCES \"product_entry\"(\"id\"), FOREIGN\n        KEY(\"measurement_unit\") REFERENCES \"measurement_unit\"(\"id\"),\n        FOREIGN KEY(\"warehouse\") REFERENCES \"warehouse\"(\"id\") );\n        \n        CREATE TABLE IF NOT EXISTS \"product_category\" ( \"id\" INTEGER NOT NULL\n        UNIQUE, \"name\" TEXT NOT NULL, \"abbreviation\" TEXT,\n        \"createdBy\" INTEGER, \"createdAt\" DATETIME DEFAULT\n        CURRENT_TIMESTAMP, \"updatedAt\" DATETIME DEFAULT\n        CURRENT_TIMESTAMP, PRIMARY KEY(\"id\" AUTOINCREMENT), FOREIGN\n        KEY(\"createdBy\") REFERENCES \"user\"(\"id\") );\n        \n        CREATE TABLE IF NOT EXISTS \"product_entry\" ( \"id\" INTEGER NOT NULL UNIQUE,\n        \"order_number\" TEXT NOT NULL, \"date\" DATETIME, \"concept\"\n        TEXT NOT NULL, \"amount\" NUMERIC, \"state\" INTEGER, \"product\"\n        INTEGER, \"supplier\" INTEGER, \"createdBy\" INTEGER,\n        \"createdAt\" DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY\n        KEY(\"id\" AUTOINCREMENT), FOREIGN KEY(\"createdBy\") REFERENCES\n        \"user\"(\"id\"), FOREIGN KEY(\"product\") REFERENCES\n        \"product\"(\"id\"), FOREIGN KEY(\"state\") REFERENCES\n        \"status\"(\"id\"), FOREIGN KEY(\"supplier\") REFERENCES\n        \"supplier\"(\"id\") );\n        \n        CREATE TABLE IF NOT EXISTS \"role\" ( \"id\" INTEGER NOT NULL UNIQUE, \"name\"\n        TEXT NOT NULL, PRIMARY KEY(\"id\" AUTOINCREMENT) );\n        \n        CREATE TABLE IF NOT EXISTS \"seller\" ( \"id\" INTEGER NOT NULL UNIQUE, \"name\"\n        INTEGER NOT NULL, \"createdBy\" INTEGER, \"createdAt\" DATETIME\n        DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(\"id\" AUTOINCREMENT),\n        FOREIGN KEY(\"createdBy\") REFERENCES \"user\"(\"id\") );\n        \n        CREATE TABLE IF NOT EXISTS \"status\" ( \"id\" INTEGER NOT NULL UNIQUE, \"name\"\n        INTEGER NOT NULL, PRIMARY KEY(\"id\" AUTOINCREMENT) );\n        \n        CREATE TABLE IF NOT EXISTS \"supplier\" ( \"id\" INTEGER NOT NULL UNIQUE,\n        \"identification\" TEXT UNIQUE, \"name\" TEXT,\n        \"representative_name\" TEXT, \"cellphone\" TEXT, \"createdBy\"\n        INTEGER, PRIMARY KEY(\"id\" AUTOINCREMENT) );\n        \n        CREATE TABLE IF NOT EXISTS \"system_setting\" ( \"id\" INTEGER NOT NULL\n        UNIQUE, \"currency_type\" INTEGER, \"warehouse\" INTEGER,\n        PRIMARY KEY(\"id\" AUTOINCREMENT), FOREIGN\n        KEY(\"currency_type\") REFERENCES \"currency_type\"(\"id\") );\n        \n        CREATE TABLE IF NOT EXISTS \"user\" ( \"id\" INTEGER NOT NULL UNIQUE, \"name\"\n        TEXT NOT NULL, \"username\" TEXT NOT NULL, \"password\" TEXT NOT\n        NULL, \"role\" INTEGER NOT NULL, \"createdBy\" INTEGER,\n        \"createdAt\" DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY\n        KEY(\"id\" AUTOINCREMENT), FOREIGN KEY(\"createdBy\") REFERENCES\n        \"user\"(\"id\"), FOREIGN KEY(\"role\") REFERENCES \"role\"(\"id\") );\n        \n        CREATE TABLE IF NOT EXISTS \"warehouse\" ( \"id\" INTEGER NOT NULL UNIQUE,\n        \"name\" TEXT NOT NULL, \"address\" TEXT, \"department\" INTEGER,\n        PRIMARY KEY(\"id\" AUTOINCREMENT), FOREIGN KEY(\"department\")\n        REFERENCES \"department\"(\"id\") );\n    ");
  console.log("✅ Tables were created!.");
};