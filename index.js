import app from './app'
const { createTables } = require("./database/create-tables");
const { feedDatabase } = require("./database/seeder");
require('dotenv').config();

// Initialize db
createTables();
feedDatabase();


// Initialize server
let port = process.env.PORT || 3017;
app.listen(port, () => console.log('Server listening on port', port));
