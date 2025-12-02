import Database from "better-sqlite3";
const path = require("path");

const db = new Database("database/chat.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS chat (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        message TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
`);

module.exports = db;