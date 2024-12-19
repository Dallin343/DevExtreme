"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateHeaderCellDefaultProps = exports.DateHeaderCell = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _index = require("../../../../core/r1/utils/index");
var _render_utils = require("../../../../core/r1/utils/render_utils");
var _index2 = require("../../utils/index");
var _cell = require("./cell");
var _date_header_text = require("./date_header_text");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DateHeaderCellDefaultProps = exports.DateHeaderCellDefaultProps = _extends({}, _cell.CellBaseDefaultProps, {
  today: false,
  colSpan: 1,
  isWeekDayCell: false,
  splitText: false,
  isTimeCellTemplate: false
});
class DateHeaderCell extends _inferno2.BaseInfernoComponent {
  render() {
    const {
      viewContext: {
        view: {
          type: viewType
        },
        crossScrollingEnabled
      },
      colSpan,
      dateCellTemplate,
      groupIndex,
      groups,
      index,
      isTimeCellTemplate,
      splitText,
      startDate,
      text,
      timeCellTemplate,
      className,
      isFirstGroupCell,
      isLastGroupCell,
      isWeekDayCell,
      today
    } = this.props;
    const cellSizeHorizontalClass = _index2.renderUtils.getCellSizeHorizontalClass(viewType, crossScrollingEnabled);
    const cellClasses = (0, _render_utils.combineClasses)({
      'dx-scheduler-header-panel-cell': true,
      [cellSizeHorizontalClass]: true,
      'dx-scheduler-header-panel-current-time-cell': today,
      'dx-scheduler-header-panel-week-cell': isWeekDayCell,
      [className ?? '']: !!className
    });
    const classes = _index2.renderUtils.getGroupCellClasses(isFirstGroupCell, isLastGroupCell, cellClasses);
    const useTemplate = !isTimeCellTemplate && !!dateCellTemplate || isTimeCellTemplate && !!timeCellTemplate;
    const TimeCellTemplateComponent = (0, _index.getTemplate)(timeCellTemplate);
    const DateCellTemplateComponent = (0, _index.getTemplate)(dateCellTemplate);
    const children = useTemplate ? // TODO: this is a workaround for https://github.com/DevExpress/devextreme-renovation/issues/574
    (0, _inferno.createFragment)([isTimeCellTemplate && TimeCellTemplateComponent && TimeCellTemplateComponent({
      data: {
        date: startDate,
        text,
        groups,
        groupIndex
      },
      index
    }), !isTimeCellTemplate && DateCellTemplateComponent && DateCellTemplateComponent({
      data: {
        date: startDate,
        text,
        groups,
        groupIndex
      },
      index
    })], 0) : // @ts-ignore
    (0, _inferno.createComponentVNode)(2, _date_header_text.DateHeaderText, {
      "splitText": splitText,
      "text": text
    });
    return (0, _inferno.createVNode)(1, "th", classes, children, 0, {
      "colSpan": colSpan,
      "title": text
    });
  }
}
exports.DateHeaderCell = DateHeaderCell;
DateHeaderCell.defaultProps = DateHeaderCellDefaultProps;