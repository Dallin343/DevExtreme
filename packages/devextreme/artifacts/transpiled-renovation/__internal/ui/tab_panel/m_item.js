"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = require("../../../core/utils/common");
var _m_item = _interopRequireDefault(require("../../ui/collection/m_item"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// @ts-expect-error dxClass inheritance issue
class TabPanelItem extends _m_item.default {
  _renderWatchers() {
    // @ts-expect-error
    this._startWatcher('badge', _common.noop);
    return super._renderWatchers();
  }
}
exports.default = TabPanelItem;