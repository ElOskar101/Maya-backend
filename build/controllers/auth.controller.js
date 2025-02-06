"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendToken = void 0;
var _resHandler = require("../../libs/utils/res-handler");
var _encriptor = require("../../libs/utils/encriptor");
/**
 * Creates and send a token. This is a result of success login in middleware function
 * @param req
 * @param res
 */
var sendToken = exports.sendToken = function sendToken(req, res) {
  try {
    var token = (0, _encriptor.createToken)(req.userId);
    (0, _resHandler.onSuccess)({
      token: token
    }, res);
  } catch (e) {
    (0, _resHandler.onError)(e.message, 'auth.controller', 'sendToken', res);
  }
};