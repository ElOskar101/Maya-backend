const path = require("path");
const Database = require("better-sqlite3");
require('dotenv').config();

export const initDatabase = () => {
    const DB_PATH = path.join(__dirname, process.env.DATABASE_NAME);
    return new Database(DB_PATH, { verbose: console.log });
}

