import { name as clickEventName } from '../../../common/core/events/click';
import eventsEngine from '../../../common/core/events/core/events_engine';
import { addNamespace } from '../../../common/core/events/utils/index';
import registerComponent from '../../../core/component_registrator';
import devices from '../../../core/devices';
import $ from '../../../core/renderer';
import { extend } from '../../../core/utils/extend';
import Editor from '../../../ui/editor/editor';
const RADIO_BUTTON_CLASS = 'dx-radiobutton';
const RADIO_BUTTON_ICON_CLASS = 'dx-radiobutton-icon';
const RADIO_BUTTON_ICON_DOT_CLASS = 'dx-radiobutton-icon-dot';
const RADIO_BUTTON_CHECKED_CLASS = 'dx-radiobutton-checked';
const RADIO_BUTTON_ICON_CHECKED_CLASS = 'dx-radiobutton-icon-checked';
// @ts-expect-error
const RadioButton = Editor.inherit({
  _supportedKeys() {
    const click = function (e) {
      e.preventDefault();
      this._clickAction({
        event: e
      });
    };
    return extend(this.callBase(), {
      space: click
    });
  },
  _getDefaultOptions() {
    return extend(this.callBase(), {
      hoverStateEnabled: true,
      activeStateEnabled: true,
      value: false
    });
  },
  _canValueBeChangedByClick() {
    return true;
  },
  _defaultOptionsRules() {
    return this.callBase().concat([{
      device() {
        return devices.real().deviceType === 'desktop' && !devices.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }]);
  },
  _init() {
    this.callBase();
    this.$element().addClass(RADIO_BUTTON_CLASS);
  },
  _initMarkup() {
    this.callBase();
    this._renderIcon();
    this._renderCheckedState(this.option('value'));
    this._renderClick();
    this.setAria('role', 'radio');
  },
  _renderIcon() {
    this._$icon = $('<div>').addClass(RADIO_BUTTON_ICON_CLASS);
    $('<div>').addClass(RADIO_BUTTON_ICON_DOT_CLASS).appendTo(this._$icon);
    this.$element().append(this._$icon);
  },
  _renderCheckedState(checked) {
    this.$element().toggleClass(RADIO_BUTTON_CHECKED_CLASS, checked).find(`.${RADIO_BUTTON_ICON_CLASS}`).toggleClass(RADIO_BUTTON_ICON_CHECKED_CLASS, checked);
    this.setAria('checked', checked);
  },
  _renderClick() {
    const eventName = addNamespace(clickEventName, this.NAME);
    this._clickAction = this._createAction(args => {
      this._clickHandler(args.event);
    });
    eventsEngine.off(this.$element(), eventName);
    eventsEngine.on(this.$element(), eventName, e => {
      this._clickAction({
        event: e
      });
    });
  },
  _clickHandler(e) {
    this._saveValueChangeEvent(e);
    this.option('value', true);
  },
  _optionChanged(args) {
    switch (args.name) {
      case 'value':
        this._renderCheckedState(args.value);
        this.callBase(args);
        break;
      default:
        this.callBase(args);
    }
  }
});
registerComponent('dxRadioButton', RadioButton);
export default RadioButton;