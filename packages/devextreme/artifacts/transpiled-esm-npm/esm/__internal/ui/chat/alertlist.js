import _extends from "@babel/runtime/helpers/esm/extends";
import messageLocalization from '../../../common/core/localization/message';
import $ from '../../../core/renderer';
import Widget from '../../core/widget/widget';
const CHAT_ALERTLIST_CLASS = 'dx-chat-alertlist';
const CHAT_ALERTLIST_ERROR_CLASS = 'dx-chat-alertlist-error';
const CHAT_ALERTLIST_ERROR_ICON_CLASS = 'dx-chat-alertlist-error-icon';
const CHAT_ALERTLIST_ERROR_TEXT_CLASS = 'dx-chat-alertlist-error-text';
class AlertList extends Widget {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      items: []
    });
  }
  _initMarkup() {
    $(this.element()).addClass(CHAT_ALERTLIST_CLASS);
    super._initMarkup();
    const {
      items
    } = this.option();
    this._renderItems(items);
    this._updateAria();
  }
  _renderItems(items) {
    if (items !== null && items !== void 0 && items.length) {
      items.forEach(itemData => {
        this._renderItem(itemData);
      });
    }
  }
  _renderItem(itemData) {
    const $item = $('<div>');
    $item.addClass(CHAT_ALERTLIST_ERROR_CLASS);
    $('<div>').addClass(CHAT_ALERTLIST_ERROR_ICON_CLASS).appendTo($item);
    $('<div>').addClass(CHAT_ALERTLIST_ERROR_TEXT_CLASS).appendTo($item).text(String((itemData === null || itemData === void 0 ? void 0 : itemData.message) ?? ''));
    $item.appendTo(this.$element());
  }
  _updateAria() {
    const aria = {
      role: 'log',
      atomic: 'false',
      label: messageLocalization.format('dxChat-alertListAriaLabel'),
      live: 'polite',
      relevant: 'additions'
    };
    this.setAria(aria);
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case 'items':
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
export default AlertList;