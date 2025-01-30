"use strict";

var _app = _interopRequireDefault(require("./app"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var port = 3017;
_app["default"].listen(port, function () {
  return console.log('Server listening on port', port);
});