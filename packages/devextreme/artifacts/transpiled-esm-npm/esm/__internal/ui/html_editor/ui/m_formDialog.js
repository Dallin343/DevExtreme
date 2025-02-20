import _extends from "@babel/runtime/helpers/esm/extends";
import localizationMessage from '../../../../common/core/localization/message';
import devices from '../../../../core/devices';
import $ from '../../../../core/renderer';
import { Deferred } from '../../../../core/utils/deferred';
import { extend } from '../../../../core/utils/extend';
import {
// @ts-expect-error
getCurrentScreenFactor, hasWindow } from '../../../../core/utils/window';
import Form from '../../../../ui/form';
import Popup from '../../../../ui/popup';
import { isFluent, isMaterialBased } from '../../../../ui/themes';
const DIALOG_CLASS = 'dx-formdialog';
const FORM_CLASS = 'dx-formdialog-form';
const DROPDOWN_EDITOR_OVERLAY_CLASS = 'dx-dropdowneditor-overlay';
const getApplyButtonConfig = () => {
  // @ts-expect-error
  if (isFluent()) {
    return {
      stylingMode: 'contained',
      type: 'default'
    };
  }
  return {};
};
const getCancelButtonConfig = () => {
  // @ts-expect-error
  if (isFluent()) {
    return {
      stylingMode: 'outlined',
      type: 'normal'
    };
  }
  return {};
};
class FormDialog {
  constructor(editorInstance, popupConfig) {
    this._editorInstance = editorInstance;
    this._popupUserConfig = popupConfig;
    this._renderPopup();
    this._attachOptionChangedHandler();
  }
  _renderPopup() {
    const editorInstance = this._editorInstance;
    const $container = $('<div>').addClass(DIALOG_CLASS).appendTo(editorInstance.$element());
    const popupConfig = this._getPopupConfig();
    return editorInstance._createComponent($container, Popup, popupConfig);
  }
  _attachOptionChangedHandler() {
    var _this$_popup;
    (_this$_popup = this._popup) === null || _this$_popup === void 0 || _this$_popup.on('optionChanged', _ref => {
      let {
        name,
        value
      } = _ref;
      if (name === 'title') {
        this._updateFormLabel(value);
      }
    });
  }
  _escKeyHandler() {
    this._popup.hide();
  }
  _addEscapeHandler(e) {
    e.component.registerKeyHandler('escape', this._escKeyHandler.bind(this));
  }
  _isSmallScreen() {
    const screenFactor = hasWindow() ? getCurrentScreenFactor() : null;
    return devices.real().deviceType === 'phone' || screenFactor === 'xs';
  }
  _getPopupConfig() {
    return extend({
      onInitialized: e => {
        this._popup = e.component;
        this._popup.on('hiding', () => this.onHiding());
        this._popup.on('shown', () => {
          this._form.focus();
        });
      },
      deferRendering: false,
      focusStateEnabled: false,
      showCloseButton: false,
      fullScreen: this._isSmallScreen(),
      contentTemplate: contentElem => {
        const $formContainer = $('<div>').appendTo(contentElem);
        this._renderForm($formContainer, {
          onEditorEnterKey: e => this.callAddButtonAction(e.event),
          customizeItem: item => {
            if (item.itemType === 'simple') {
              item.editorOptions = extend(true, {}, item.editorOptions, {
                onInitialized: this._addEscapeHandler.bind(this)
              });
            }
          }
        });
      },
      toolbarItems: [{
        toolbar: 'bottom',
        location: 'after',
        widget: 'dxButton',
        options: _extends({
          onInitialized: this._addEscapeHandler.bind(this),
          text: localizationMessage.format('OK'),
          onClick: e => this.callAddButtonAction(e.event)
        }, getApplyButtonConfig())
      }, {
        toolbar: 'bottom',
        location: 'after',
        widget: 'dxButton',
        options: _extends({
          onInitialized: this._addEscapeHandler.bind(this),
          text: localizationMessage.format('Cancel'),
          onClick: () => {
            this._popup.hide();
          }
        }, getCancelButtonConfig())
      }],
      _wrapperClassExternal: `${DIALOG_CLASS} ${DROPDOWN_EDITOR_OVERLAY_CLASS}`
    }, this._popupUserConfig);
  }
  onHiding() {
    this.beforeAddButtonAction = undefined;
    // @ts-expect-error
    this.deferred.reject();
  }
  callAddButtonAction(event) {
    if (this.beforeAddButtonAction && !this.beforeAddButtonAction()) {
      return;
    }
    this.hide(this._form.option('formData'), event);
  }
  _renderForm($container, options) {
    $container.addClass(FORM_CLASS);
    this._form = this._editorInstance._createComponent($container, Form, options);
    // @ts-expect-error
    this._updateFormLabel();
  }
  _updateFormLabel(text) {
    var _this$_form;
    // @ts-expect-error
    const label = text ?? this.popupOption('title');
    (_this$_form = this._form) === null || _this$_form === void 0 || _this$_form.$element()
    // @ts-expect-error
    .attr('aria-label', label);
  }
  _getDefaultFormOptions() {
    return {
      colCount: 1,
      width: 'auto',
      // @ts-expect-error
      labelLocation: isMaterialBased() ? 'top' : 'left'
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formOption(optionName, optionValue) {
    // @ts-expect-error
    return this._form.option.apply(this._form, arguments);
  }
  show(formUserConfig) {
    if (this._popup.option('visible')) {
      return;
    }
    this.deferred = Deferred();
    const formConfig = extend(this._getDefaultFormOptions(), formUserConfig);
    this._form.option(formConfig);
    this._popup.show();
    return this.deferred.promise();
  }
  hide(formData, event) {
    // @ts-expect-error
    this.deferred.resolve(formData, event);
    this._popup.hide();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  popupOption(optionName, optionValue) {
    // @ts-expect-error
    return this._popup.option.apply(this._popup, arguments);
  }
}
export default FormDialog;