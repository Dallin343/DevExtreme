"use strict";

var _jquery = _interopRequireDefault(require("jquery"));
var _renderer_base = _interopRequireDefault(require("../../core/renderer_base"));
var _use_jquery = _interopRequireDefault(require("./use_jquery"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line no-restricted-imports

const useJQuery = (0, _use_jquery.default)();
if (useJQuery) {
  _renderer_base.default.set(_jquery.default);
}