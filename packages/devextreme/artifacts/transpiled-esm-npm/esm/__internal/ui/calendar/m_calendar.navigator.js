import _extends from "@babel/runtime/helpers/esm/extends";
import $ from '../../../core/renderer';
import Button from '../../../ui/button';
import { isFluent, isMaterial } from '../../../ui/themes';
import Widget from '../widget';
const CALENDAR_NAVIGATOR_CLASS = 'dx-calendar-navigator';
const CALENDAR_NAVIGATOR_PREVIOUS_MONTH_CLASS = 'dx-calendar-navigator-previous-month';
const CALENDAR_NAVIGATOR_NEXT_MONTH_CLASS = 'dx-calendar-navigator-next-month';
const CALENDAR_NAVIGATOR_PREVIOUS_VIEW_CLASS = 'dx-calendar-navigator-previous-view';
const CALENDAR_NAVIGATOR_NEXT_VIEW_CLASS = 'dx-calendar-navigator-next-view';
const CALENDAR_NAVIGATOR_DISABLED_LINK_CLASS = 'dx-calendar-disabled-navigator-link';
const CALENDAR_NAVIGATOR_CAPTION_BUTTON_CLASS = 'dx-calendar-caption-button';
const BUTTON_TEXT_CLASS = 'dx-button-text';
class Navigator extends Widget {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      onClick: undefined,
      onCaptionClick: undefined,
      type: 'normal',
      stylingMode: 'outlined',
      text: ''
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        // @ts-expect-error
        return isMaterial();
      },
      options: {
        type: 'default',
        stylingMode: 'text'
      }
    }, {
      device() {
        // @ts-expect-error
        return isFluent();
      },
      options: {
        type: 'normal',
        stylingMode: 'text'
      }
    }]);
  }
  _init() {
    super._init();
    this._initActions();
  }
  _initActions() {
    this._clickAction = this._createActionByOption('onClick');
    this._captionClickAction = this._createActionByOption('onCaptionClick');
  }
  _initMarkup() {
    super._initMarkup();
    $(this.element()).addClass(CALENDAR_NAVIGATOR_CLASS);
    this._renderButtons();
    this._renderCaption();
  }
  _renderButtons() {
    const {
      rtlEnabled,
      type,
      stylingMode,
      focusStateEnabled
    } = this.option();
    const direction = 1;
    this._prevButton = this._createComponent($('<div>'), Button, {
      focusStateEnabled,
      icon: rtlEnabled ? 'chevronright' : 'chevronleft',
      onClick: e => {
        this._clickAction({
          direction: -direction,
          event: e
        });
      },
      type,
      stylingMode,
      // @ts-expect-error
      integrationOptions: {}
    });
    const $prevButton = $(this._prevButton.element()).addClass(CALENDAR_NAVIGATOR_PREVIOUS_VIEW_CLASS).addClass(CALENDAR_NAVIGATOR_PREVIOUS_MONTH_CLASS);
    this._nextButton = this._createComponent($('<div>'), Button, {
      focusStateEnabled,
      icon: rtlEnabled ? 'chevronleft' : 'chevronright',
      onClick: e => {
        this._clickAction({
          direction,
          event: e
        });
      },
      type,
      stylingMode,
      // @ts-expect-error
      integrationOptions: {}
    });
    const $nextButton = $(this._nextButton.element()).addClass(CALENDAR_NAVIGATOR_NEXT_VIEW_CLASS).addClass(CALENDAR_NAVIGATOR_NEXT_MONTH_CLASS);
    this._caption = this._createComponent($('<div>').addClass(CALENDAR_NAVIGATOR_CAPTION_BUTTON_CLASS), Button, {
      focusStateEnabled,
      onClick: e => {
        this._captionClickAction({
          event: e
        });
      },
      type,
      stylingMode,
      template: (_, content) => {
        const {
          text
        } = this.option();
        const captionSeparator = ' - ';
        const viewCaptionTexts = text.split(captionSeparator);
        viewCaptionTexts.forEach(captionText => {
          $(content).append($('<span>').addClass(BUTTON_TEXT_CLASS).text(captionText));
        });
      },
      // @ts-expect-error
      integrationOptions: {}
    });
    const $caption = this._caption.$element();
    // @ts-expect-error
    this.$element().append($prevButton, $caption, $nextButton);
  }
  _renderCaption() {
    var _this$_caption;
    (_this$_caption = this._caption) === null || _this$_caption === void 0 || _this$_caption.option('text', this.option('text'));
  }
  toggleButton(buttonPrefix, value) {
    const buttonName = `_${buttonPrefix}Button`;
    const button = this[buttonName];
    if (button) {
      button.option('disabled', value);
      button.$element().toggleClass(CALENDAR_NAVIGATOR_DISABLED_LINK_CLASS, value);
    }
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'text':
        this._renderCaption();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
export default Navigator;