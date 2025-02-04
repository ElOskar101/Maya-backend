const path = require("path");
const Database = require("better-sqlite3");
require('dotenv').config();

export const initDatabase = () => {
    const DB_PATH = path.join(__dirname, process.env.DATABASE_NAME);
    const db = new Database(DB_PATH, { verbose: console.log });
    db.pragma(`key = '${process.env.DATABASE_PASSWORD}'`);
    const check = db.prepare("PRAGMA cipher_version;").run();
    console.log("Versión de cifrado:", check);
    db.pragma('journal_mode = WAL');
    return db;
}

