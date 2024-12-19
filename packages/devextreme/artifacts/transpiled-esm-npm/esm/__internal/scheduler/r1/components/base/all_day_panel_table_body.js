import { createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { getTemplate } from '../../../../core/r1/utils/index';
import { combineClasses } from '../../../../core/r1/utils/render_utils';
import { AllDayPanelCell } from './all_day_panel_cell';
import { Row } from './row';
export const AllDayPanelTableBodyDefaultProps = {
  viewData: [],
  isVerticalGroupOrientation: false,
  className: '',
  leftVirtualCellWidth: 0,
  rightVirtualCellWidth: 0
};
export class AllDayPanelTableBody extends BaseInfernoComponent {
  render() {
    const {
      className,
      viewData,
      viewContext,
      leftVirtualCellWidth,
      rightVirtualCellWidth,
      leftVirtualCellCount,
      rightVirtualCellCount,
      isVerticalGroupOrientation,
      dataCellTemplate
    } = this.props;
    const classes = combineClasses({
      'dx-scheduler-all-day-table-row': true,
      [className ?? '']: !!className
    });
    const DataCellTemplateComponent = getTemplate(dataCellTemplate);
    return (// @ts-ignore
      createComponentVNode(2, Row, {
        "leftVirtualCellWidth": leftVirtualCellWidth,
        "rightVirtualCellWidth": rightVirtualCellWidth,
        "leftVirtualCellCount": leftVirtualCellCount,
        "rightVirtualCellCount": rightVirtualCellCount,
        "className": classes,
        children: viewData.map(_ref => {
          let {
            endDate,
            groupIndex: cellGroupIndex,
            groups,
            index: cellIndex,
            isFirstGroupCell,
            isFocused,
            isLastGroupCell,
            isSelected,
            key,
            startDate
          } = _ref;
          return (// @ts-ignore
            createComponentVNode(2, AllDayPanelCell, {
              "viewContext": viewContext,
              "isFirstGroupCell": !isVerticalGroupOrientation && isFirstGroupCell,
              "isLastGroupCell": !isVerticalGroupOrientation && isLastGroupCell,
              "startDate": startDate,
              "endDate": endDate,
              "groups": groups,
              "groupIndex": cellGroupIndex,
              "index": cellIndex,
              "dataCellTemplate": DataCellTemplateComponent,
              "isSelected": isSelected ?? false,
              "isFocused": isFocused ?? false
            }, key)
          );
        })
      })
    );
  }
}
AllDayPanelTableBody.defaultProps = AllDayPanelTableBodyDefaultProps;