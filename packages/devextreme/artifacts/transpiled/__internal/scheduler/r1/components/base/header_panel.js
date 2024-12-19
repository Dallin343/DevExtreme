"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderPanelDefaultProps = exports.HeaderPanel = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _index = require("../../../../core/r1/utils/index");
var _index2 = require("../../utils/index");
var _date_header = require("./date_header");
var _group_panel = require("./group_panel");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const HeaderPanelDefaultProps = exports.HeaderPanelDefaultProps = _extends({}, _group_panel.GroupPanelDefaultProps, {
  isRenderDateHeader: true,
  dateHeaderTemplate: _date_header.DateHeader
});
class HeaderPanel extends _inferno2.InfernoWrapperComponent {
  // eslint-disable-next-line class-methods-use-this
  createEffects() {
    return [(0, _inferno2.createReRenderEffect)()];
  }
  render() {
    const {
      viewContext,
      dateHeaderData,
      groupByDate,
      groupOrientation,
      groupPanelData,
      groups,
      isRenderDateHeader,
      dateCellTemplate,
      dateHeaderTemplate,
      resourceCellTemplate,
      timeCellTemplate
    } = this.props;
    const isHorizontalGrouping = (0, _index2.isHorizontalGroupingApplied)(groups, groupOrientation);
    const DateCellTemplateComponent = (0, _index.getTemplate)(dateCellTemplate);
    const DateHeaderTemplateComponent = (0, _index.getTemplate)(dateHeaderTemplate);
    const ResourceCellTemplateComponent = (0, _index.getTemplate)(resourceCellTemplate);
    const TimeCellTemplateComponent = (0, _index.getTemplate)(timeCellTemplate);
    return (0, _inferno.createVNode)(1, "thead", null, [isHorizontalGrouping && !groupByDate && // @ts-ignore
    (0, _inferno.createComponentVNode)(2, _group_panel.GroupPanel, {
      "viewContext": viewContext,
      "groupPanelData": groupPanelData,
      "groups": groups,
      "groupByDate": groupByDate,
      "groupOrientation": groupOrientation,
      "resourceCellTemplate": ResourceCellTemplateComponent
    }), isRenderDateHeader && DateHeaderTemplateComponent({
      viewContext,
      groupByDate,
      dateHeaderData,
      groupOrientation,
      groups,
      dateCellTemplate: DateCellTemplateComponent,
      timeCellTemplate: TimeCellTemplateComponent
    }), groupByDate && // @ts-ignore
    (0, _inferno.createComponentVNode)(2, _group_panel.GroupPanel, {
      "viewContext": viewContext,
      "groupPanelData": groupPanelData,
      "groups": groups,
      "groupByDate": groupByDate,
      "groupOrientation": groupOrientation,
      "resourceCellTemplate": ResourceCellTemplateComponent
    })], 0);
  }
}
exports.HeaderPanel = HeaderPanel;
HeaderPanel.defaultProps = HeaderPanelDefaultProps;