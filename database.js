const path = require("path");
const Database = require("better-sqlite3");


const DB_PATH = path.join(__dirname, "database.db");
const db = new Database(DB_PATH);
