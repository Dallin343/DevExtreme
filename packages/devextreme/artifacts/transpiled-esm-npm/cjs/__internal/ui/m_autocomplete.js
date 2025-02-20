"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("../../common/core/events/utils/index");
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _common = require("../../core/utils/common");
var _deferred = require("../../core/utils/deferred");
var _extend = require("../../core/utils/extend");
var _ui = _interopRequireDefault(require("../../ui/drop_down_editor/ui.drop_down_list"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const AUTOCOMPLETE_CLASS = 'dx-autocomplete';
const AUTOCOMPLETE_POPUP_WRAPPER_CLASS = 'dx-autocomplete-popup-wrapper';
const Autocomplete = _ui.default.inherit({
  _supportedKeys() {
    let item = this._list ? this._list.option('focusedElement') : null;
    const parent = this.callBase();
    item = item && (0, _renderer.default)(item);
    return (0, _extend.extend)({}, parent, {
      upArrow(e) {
        if (parent.upArrow.apply(this, arguments) && !(0, _index.isCommandKeyPressed)(e)) {
          e.preventDefault();
          e.stopPropagation();
          if (item && !this._calcNextItem(-1)) {
            this._clearFocusedItem();
            return false;
          }
        }
        return true;
      },
      downArrow(e) {
        if (parent.downArrow.apply(this, arguments) && !(0, _index.isCommandKeyPressed)(e)) {
          e.preventDefault();
          e.stopPropagation();
          if (item && !this._calcNextItem(1)) {
            this._clearFocusedItem();
            return false;
          }
        }
        return true;
      },
      enter(e) {
        if (!item) {
          this.close();
        }
        const opened = this.option('opened');
        if (opened) {
          e.preventDefault();
        }
        return opened;
      }
    });
  },
  _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
      minSearchLength: 1,
      maxItemCount: 10,
      noDataText: '',
      showDropDownButton: false,
      searchEnabled: true
    });
  },
  _initMarkup() {
    this.callBase();
    this.$element().addClass(AUTOCOMPLETE_CLASS);
  },
  _getAriaAutocomplete() {
    const {
      disabled,
      readOnly
    } = this.option();
    const isInputEditable = !(readOnly || disabled);
    return isInputEditable ? 'list' : 'none';
  },
  _displayGetterExpr() {
    return this.option('valueExpr');
  },
  _closeOutsideDropDownHandler(_ref) {
    let {
      target
    } = _ref;
    return !(0, _renderer.default)(target).closest(this.$element()).length;
  },
  _renderDimensions() {
    this.callBase();
    this._updatePopupWidth();
    this._updateListDimensions();
  },
  _popupWrapperClass() {
    return `${this.callBase()} ${AUTOCOMPLETE_POPUP_WRAPPER_CLASS}`;
  },
  _listConfig() {
    return (0, _extend.extend)(this.callBase(), {
      pageLoadMode: 'none',
      onSelectionChanged: e => {
        this._setSelectedItem(e.addedItems[0]);
      }
    });
  },
  _listItemClickHandler(e) {
    this._saveValueChangeEvent(e.event);
    const value = this._displayGetter(e.itemData);
    this.option('value', value);
    this.close();
  },
  _setListDataSource() {
    if (!this._list) {
      return;
    }
    this._list.option('selectedItems', []);
    this.callBase();
  },
  _refreshSelected: _common.noop,
  _searchCanceled() {
    this.callBase();
    this.close();
  },
  _loadItem(value, cache) {
    const selectedItem = this._getItemFromPlain(value, cache);
    return (0, _deferred.Deferred)().resolve(selectedItem).promise();
  },
  _dataSourceOptions() {
    return {
      paginate: true,
      pageSize: this.option('maxItemCount')
    };
  },
  _searchDataSource(searchValue) {
    this._dataSource.pageSize(this.option('maxItemCount'));
    this.callBase(searchValue);
    this._clearFocusedItem();
  },
  _clearFocusedItem() {
    if (this._list) {
      this._list.option('focusedElement', null);
      this._list.option('selectedIndex', -1);
    }
  },
  _renderValueEventName() {
    return 'input keyup';
  },
  _valueChangeEventHandler(e) {
    const value = this._input().val() || null;
    return this.callBase(e, value);
  },
  _optionChanged(args) {
    switch (args.name) {
      case 'readOnly':
      case 'disabled':
        this.callBase(args);
        this._setDefaultAria();
        break;
      case 'maxItemCount':
        this._searchDataSource();
        break;
      case 'valueExpr':
        this._compileDisplayGetter();
        this._setListOption('displayExpr', this._displayGetterExpr());
        this.callBase(args);
        break;
      default:
        this.callBase(args);
    }
  },
  clear() {
    this.callBase();
    this.close();
  },
  reset() {
    let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    if (arguments.length) {
      this.callBase(value);
    } else {
      this.callBase();
    }
    this.close();
  }
});
(0, _component_registrator.default)('dxAutocomplete', Autocomplete);
var _default = exports.default = Autocomplete;