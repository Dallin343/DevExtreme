"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _m_date_box = _interopRequireDefault(require("./m_date_box.mask"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
(0, _component_registrator.default)('dxDateBox', _m_date_box.default);
var _default = exports.default = _m_date_box.default;