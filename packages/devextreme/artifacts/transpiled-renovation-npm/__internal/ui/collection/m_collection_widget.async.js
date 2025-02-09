"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = require("../../../core/utils/common");
var _deferred = require("../../../core/utils/deferred");
var _m_collection_widget = _interopRequireDefault(require("./m_collection_widget.edit"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const AsyncCollectionWidget = _m_collection_widget.default.inherit({
  _initMarkup() {
    this._asyncTemplateItems = [];
    this.callBase();
  },
  _render() {
    this.callBase(arguments);
    this._planPostRenderActions();
  },
  _renderItemContent(args) {
    const renderContentDeferred = (0, _deferred.Deferred)();
    const itemDeferred = (0, _deferred.Deferred)();
    this._asyncTemplateItems[args.index] = itemDeferred;
    const $itemContent = this.callBase(args);
    itemDeferred.done(() => {
      renderContentDeferred.resolve($itemContent);
    });
    return renderContentDeferred.promise();
  },
  _onItemTemplateRendered(itemTemplate, renderArgs) {
    return () => {
      var _this$_asyncTemplateI;
      (_this$_asyncTemplateI = this._asyncTemplateItems[renderArgs.index]) === null || _this$_asyncTemplateI === void 0 || _this$_asyncTemplateI.resolve();
    };
  },
  _postProcessRenderItems: _common.noop,
  _planPostRenderActions() {
    const d = (0, _deferred.Deferred)();
    _deferred.when.apply(this, this._asyncTemplateItems).done(() => {
      this._postProcessRenderItems();
      d.resolve();
    });
    return d.promise();
  },
  _clean() {
    this.callBase();
    this._asyncTemplateItems.forEach(item => {
      item.reject();
    });
    this._asyncTemplateItems = [];
  }
});
var _default = exports.default = AsyncCollectionWidget;