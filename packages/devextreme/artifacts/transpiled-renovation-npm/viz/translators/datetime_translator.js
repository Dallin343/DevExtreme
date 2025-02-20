"use strict";

exports.default = void 0;
var _date = _interopRequireDefault(require("../../core/utils/date"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function parse(value) {
  return value !== null ? new Date(value) : value;
}
var _default = exports.default = {
  fromValue: parse,
  toValue: parse,
  _add: _date.default.addDateInterval,
  convert: _date.default.dateToMilliseconds
};
module.exports = exports.default;
module.exports.default = exports.default;