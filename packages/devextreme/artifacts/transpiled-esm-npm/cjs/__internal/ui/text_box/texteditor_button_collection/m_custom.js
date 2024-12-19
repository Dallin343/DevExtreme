"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _click = require("../../../../common/core/events/click");
var _events_engine = _interopRequireDefault(require("../../../../common/core/events/core/events_engine"));
var _hover = require("../../../../common/core/events/hover");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _extend = require("../../../../core/utils/extend");
var _button = _interopRequireDefault(require("../../../../ui/button"));
var _m_button = _interopRequireDefault(require("./m_button"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CUSTOM_BUTTON_HOVERED_CLASS = 'dx-custom-button-hovered';
class CustomButton extends _m_button.default {
  _attachEvents(instance, $element) {
    const {
      editor
    } = this;
    _events_engine.default.on($element, _hover.start, () => {
      editor.$element().addClass(CUSTOM_BUTTON_HOVERED_CLASS);
    });
    _events_engine.default.on($element, _hover.end, () => {
      editor.$element().removeClass(CUSTOM_BUTTON_HOVERED_CLASS);
    });
    _events_engine.default.on($element, _click.name, e => {
      e.stopPropagation();
    });
  }
  _create() {
    const {
      editor
    } = this;
    const $element = (0, _renderer.default)('<div>');
    this._addToContainer($element);
    const instance = editor._createComponent($element, _button.default, (0, _extend.extend)({}, this.options, {
      ignoreParentReadOnly: true,
      disabled: this._isDisabled(),
      integrationOptions: this._prepareIntegrationOptions(editor)
    }));
    return {
      $element,
      instance
    };
  }
  _prepareIntegrationOptions(editor) {
    return (0, _extend.extend)({}, editor.option('integrationOptions'), {
      skipTemplates: ['content']
    });
  }
  update() {
    const isUpdated = super.update();
    if (this.instance) {
      this.instance.option('disabled', this._isDisabled());
    }
    return isUpdated;
  }
  _isVisible() {
    const {
      editor
    } = this;
    return editor.option('visible');
  }
  _isDisabled() {
    const isDefinedByUser = this.options.disabled !== undefined;
    if (isDefinedByUser) {
      return this.instance ? this.instance.option('disabled') : this.options.disabled;
    }
    return this.editor.option('readOnly');
  }
}
exports.default = CustomButton;