"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.feedDatabase = void 0;
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var _require = require("../database"),
  initDatabase = _require.initDatabase;
var db = initDatabase();
var feedDatabase = exports.feedDatabase = function feedDatabase() {
  var values = [{
    name: 'Oscar Gonzalez',
    username: 'ElOskar101',
    password: '1234',
    role: 1
  }, {
    name: 'William Acuna',
    username: 'EWacuna',
    password: '1234',
    role: 2
  }];
  var valuesRole = [{
    name: 'admin'
  }, {
    name: 'seller'
  }];
  var userInsert = db.prepare('INSERT INTO user (name, username, password, role) VALUES (@name, @username, @password, @role)');
  var rolInsertQuery = db.prepare('INSERT INTO role (name) VALUES (@name)');

  /*let insertData = db.transaction((values) => {
      for (const value of values) rolInsertQuery.run(value);
  });
    insertData(valuesRole);*/

  var insertData = db.transaction(function (values) {
    var _iterator = _createForOfIteratorHelper(values),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var user = _step.value;
        userInsert.run(user);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
  insertData(values);
  console.log('Default data was inserted into seeder tables');
};