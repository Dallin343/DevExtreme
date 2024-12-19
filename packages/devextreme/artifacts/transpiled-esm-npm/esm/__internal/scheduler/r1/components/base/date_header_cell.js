import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode, createFragment, createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { getTemplate } from '../../../../core/r1/utils/index';
import { combineClasses } from '../../../../core/r1/utils/render_utils';
import { renderUtils } from '../../utils/index';
import { CellBaseDefaultProps } from './cell';
import { DateHeaderText } from './date_header_text';
export const DateHeaderCellDefaultProps = _extends({}, CellBaseDefaultProps, {
  today: false,
  colSpan: 1,
  isWeekDayCell: false,
  splitText: false,
  isTimeCellTemplate: false
});
export class DateHeaderCell extends BaseInfernoComponent {
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
    const cellSizeHorizontalClass = renderUtils.getCellSizeHorizontalClass(viewType, crossScrollingEnabled);
    const cellClasses = combineClasses({
      'dx-scheduler-header-panel-cell': true,
      [cellSizeHorizontalClass]: true,
      'dx-scheduler-header-panel-current-time-cell': today,
      'dx-scheduler-header-panel-week-cell': isWeekDayCell,
      [className ?? '']: !!className
    });
    const classes = renderUtils.getGroupCellClasses(isFirstGroupCell, isLastGroupCell, cellClasses);
    const useTemplate = !isTimeCellTemplate && !!dateCellTemplate || isTimeCellTemplate && !!timeCellTemplate;
    const TimeCellTemplateComponent = getTemplate(timeCellTemplate);
    const DateCellTemplateComponent = getTemplate(dateCellTemplate);
    const children = useTemplate ? // TODO: this is a workaround for https://github.com/DevExpress/devextreme-renovation/issues/574
    createFragment([isTimeCellTemplate && TimeCellTemplateComponent && TimeCellTemplateComponent({
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
    createComponentVNode(2, DateHeaderText, {
      "splitText": splitText,
      "text": text
    });
    return createVNode(1, "th", classes, children, 0, {
      "colSpan": colSpan,
      "title": text
    });
  }
}
DateHeaderCell.defaultProps = DateHeaderCellDefaultProps;