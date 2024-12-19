import { createFragment, createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { getTemplate } from '../../../../core/r1/utils/index';
import { getThemeType } from '../../../../scheduler/r1/utils/themes';
import { isHorizontalGroupingApplied } from '../../utils/index';
import { DateHeaderDefaultProps } from '../base/date_header';
import { DateHeaderCell, DateHeaderCellDefaultProps } from '../base/date_header_cell';
import { Row, RowDefaultProps } from '../base/row';
const {
  isMaterialBased
} = getThemeType();
export class TimelineDateHeaderLayout extends BaseInfernoComponent {
  render() {
    const {
      viewContext,
      groupByDate,
      groupOrientation,
      groups,
      dateHeaderData,
      dateCellTemplate,
      timeCellTemplate
    } = this.props;
    const {
      dataMap,
      isMonthDateHeader,
      leftVirtualCellCount,
      leftVirtualCellWidth,
      rightVirtualCellCount,
      rightVirtualCellWidth,
      weekDayLeftVirtualCellCount,
      weekDayLeftVirtualCellWidth,
      weekDayRightVirtualCellCount,
      weekDayRightVirtualCellWidth
    } = dateHeaderData;
    const isHorizontalGrouping = isHorizontalGroupingApplied(groups, groupOrientation) && !groupByDate;
    const DateCellTemplateComponent = getTemplate(dateCellTemplate);
    const TimeCellTemplateComponent = getTemplate(timeCellTemplate);
    return createFragment(dataMap.map((dateHeaderRow, rowIndex) => {
      const rowsCount = dataMap.length;
      const isTimeCellTemplate = rowsCount - 1 === rowIndex;
      const isWeekDayRow = rowsCount > 1 && rowIndex === 0;
      const splitText = isMaterialBased && (isMonthDateHeader || isWeekDayRow);
      let validLeftVirtualCellCount = leftVirtualCellCount;
      let validRightVirtualCellCount = rightVirtualCellCount;
      let validRightVirtualCellWidth = rightVirtualCellWidth;
      let validLeftVirtualCellWidth = leftVirtualCellWidth;
      if (isWeekDayRow) {
        validLeftVirtualCellCount = weekDayLeftVirtualCellCount;
        validRightVirtualCellCount = weekDayRightVirtualCellCount;
        validRightVirtualCellWidth = weekDayRightVirtualCellWidth;
        validLeftVirtualCellWidth = weekDayLeftVirtualCellWidth;
      }
      return (// @ts-ignore
        createComponentVNode(2, Row, {
          "className": "dx-scheduler-header-row",
          "leftVirtualCellWidth": validLeftVirtualCellWidth ?? RowDefaultProps.leftVirtualCellWidth,
          "leftVirtualCellCount": validLeftVirtualCellCount,
          "rightVirtualCellWidth": validRightVirtualCellWidth ?? RowDefaultProps.rightVirtualCellWidth,
          "rightVirtualCellCount": validRightVirtualCellCount,
          children: dateHeaderRow.map(_ref => {
            let {
              colSpan,
              endDate,
              groupIndex,
              groups: cellGroups,
              index,
              isFirstGroupCell,
              isLastGroupCell,
              key,
              startDate,
              text,
              today
            } = _ref;
            return (// @ts-ignore
              createComponentVNode(2, DateHeaderCell, {
                "viewContext": viewContext,
                "startDate": startDate,
                "endDate": endDate,
                "groups": isHorizontalGrouping ? cellGroups : undefined,
                "groupIndex": isHorizontalGrouping ? groupIndex : undefined,
                "today": today ?? DateHeaderCellDefaultProps.today,
                "index": index,
                "text": text,
                "isFirstGroupCell": isFirstGroupCell,
                "isLastGroupCell": isLastGroupCell,
                "isWeekDayCell": isWeekDayRow,
                "colSpan": colSpan,
                "splitText": splitText,
                "dateCellTemplate": DateCellTemplateComponent,
                "timeCellTemplate": TimeCellTemplateComponent,
                "isTimeCellTemplate": isTimeCellTemplate
              }, key)
            );
          })
        }, rowIndex.toString())
      );
    }), 0);
  }
}
TimelineDateHeaderLayout.defaultProps = DateHeaderDefaultProps;