"use strict";

var _app = _interopRequireDefault(require("./app"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _require = require("./seeder/create-tables"),
  createTables = _require.createTables;
var _require2 = require("./seeder/seeder"),
  feedDatabase = _require2.feedDatabase;
require('dotenv').config();

// Initialize db
//createTables();
feedDatabase();

// Initialize server
var port = process.env.PORT || 3017;
_app["default"].listen(port, function () {
  return console.log('Server listening on port', port);
});