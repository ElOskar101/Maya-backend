"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMyUser = void 0;
var _resHandler = require("../../libs/utils/res-handler");
var _require = require("../../database"),
  initDatabase = _require.initDatabase;
var db = initDatabase();

/**
 * Send user in session
 * @param { Object } req - Request with username & password in its body.
 * @param { Object } res - Respond API object.
 * @returns { JSON } It responds a user object or not found
 */
var getMyUser = exports.getMyUser = function getMyUser(req, res) {
  try {
    var result = db.prepare("SELECT user.*, role.name AS role FROM user JOIN role ON role.id = user.role \n                                        WHERE user.id=?").get(req.userId);
    (0, _resHandler.onSuccess)(result, res);
  } catch (e) {
    (0, _resHandler.onError)(e.message, 'user.controller', 'getMyUser', res);
  }
};