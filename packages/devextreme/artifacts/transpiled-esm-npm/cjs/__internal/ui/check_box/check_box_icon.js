"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultCheckBoxIconProps = exports.CheckBoxIcon = void 0;
var _inferno = require("inferno");
require("../../../ui/themes");
var _inferno2 = require("@devextreme/runtime/inferno");
var _style = require("../../../core/utils/style");
const _excluded = ["size"];
/* eslint-disable @typescript-eslint/no-unsafe-return */
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
const defaultCheckBoxIconProps = exports.defaultCheckBoxIconProps = {};
class CheckBoxIcon extends _inferno2.BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.elementRef = (0, _inferno.createRef)();
    this.__getterCache = {};
  }
  get cssStyles() {
    if (this.__getterCache.cssStyles !== undefined) {
      return this.__getterCache.cssStyles;
    }
    // eslint-disable-next-line no-return-assign
    return this.__getterCache.cssStyles = (() => {
      const {
        size
      } = this.props;
      const fontSize = (0, _style.normalizeStyleProp)('fontSize', size);
      return {
        fontSize
      };
    })();
  }
  get restAttributes() {
    const _this$props = this.props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return restProps;
  }
  componentWillUpdate(nextProps) {
    if (this.props.size !== nextProps.size) {
      this.__getterCache.cssStyles = undefined;
    }
  }
  render() {
    const {
      elementRef,
      cssStyles
    } = this;
    return (0, _inferno.createVNode)(1, "span", "dx-checkbox-icon", null, 1, {
      "style": (0, _inferno2.normalizeStyles)(cssStyles)
    }, null, elementRef);
  }
}
exports.CheckBoxIcon = CheckBoxIcon;
CheckBoxIcon.defaultProps = defaultCheckBoxIconProps;