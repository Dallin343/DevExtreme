"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getViewSwitcher = exports.getDropDownViewSwitcher = void 0;
var _themes = require("../../../ui/themes");
var _m_utils = require("./m_utils");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VIEW_SWITCHER_CLASS = 'dx-scheduler-view-switcher';
const VIEW_SWITCHER_DROP_DOWN_BUTTON_CLASS = 'dx-scheduler-view-switcher-dropdown-button';
const VIEW_SWITCHER_DROP_DOWN_BUTTON_CONTENT_CLASS = 'dx-scheduler-view-switcher-dropdown-button-content';
const getViewsAndSelectedView = header => {
  const views = (0, _m_utils.formatViews)(header.views);
  let selectedView = (0, _m_utils.getViewName)(header.currentView);
  const isSelectedViewInViews = views.some(view => view.name === selectedView);
  selectedView = isSelectedViewInViews ? selectedView : undefined;
  return {
    selectedView,
    views
  };
};
const getViewSwitcher = (header, item) => {
  const {
    selectedView,
    views
  } = getViewsAndSelectedView(header);
  // @ts-expect-error
  const stylingMode = (0, _themes.isFluent)() ? 'outlined' : 'contained';
  return _extends({
    widget: 'dxButtonGroup',
    locateInMenu: 'auto',
    cssClass: VIEW_SWITCHER_CLASS,
    options: {
      items: views,
      keyExpr: 'name',
      selectedItemKeys: [selectedView],
      stylingMode,
      onItemClick: e => {
        const {
          view
        } = e.itemData;
        header._updateCurrentView(view);
      },
      onContentReady: e => {
        const viewSwitcher = e.component;
        header._addEvent('currentView', view => {
          viewSwitcher.option('selectedItemKeys', [(0, _m_utils.getViewName)(view)]);
        });
      }
    }
  }, item);
};
exports.getViewSwitcher = getViewSwitcher;
const getDropDownViewSwitcher = (header, item) => {
  const {
    selectedView,
    views
  } = getViewsAndSelectedView(header);
  const oneView = (0, _m_utils.isOneView)(views, selectedView);
  return _extends({
    widget: 'dxDropDownButton',
    locateInMenu: 'never',
    cssClass: VIEW_SWITCHER_CLASS,
    options: {
      items: views,
      useSelectMode: true,
      keyExpr: 'name',
      selectedItemKey: selectedView,
      displayExpr: 'text',
      showArrowIcon: !oneView,
      elementAttr: {
        class: VIEW_SWITCHER_DROP_DOWN_BUTTON_CLASS
      },
      onItemClick: e => {
        const {
          view
        } = e.itemData;
        header._updateCurrentView(view);
      },
      onContentReady: e => {
        const viewSwitcher = e.component;
        header._addEvent('currentView', view => {
          const views = (0, _m_utils.formatViews)(header.views);
          if ((0, _m_utils.isOneView)(views, view)) {
            header.repaint();
          }
          viewSwitcher.option('selectedItemKey', (0, _m_utils.getViewName)(view));
        });
      },
      dropDownOptions: {
        onShowing: e => {
          if (oneView) {
            e.cancel = true;
          }
        },
        width: 'max-content',
        _wrapperClassExternal: VIEW_SWITCHER_DROP_DOWN_BUTTON_CONTENT_CLASS
      }
    }
  }, item);
};
exports.getDropDownViewSwitcher = getDropDownViewSwitcher;