import _extends from "@babel/runtime/helpers/esm/extends";
import { createFragment, createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { getTemplate } from '../../../../core/r1/utils/index';
import { Fragment } from 'inferno';
import { combineClasses } from '../../../../core/r1/utils/render_utils';
import { DATE_TABLE_ROW_CLASS } from '../const';
import { AllDayPanelTableBody, AllDayPanelTableBodyDefaultProps } from './all_day_panel_table_body';
import { DateTableCellBase } from './date_table_cell_base';
import { LayoutDefaultProps } from './layout_props';
import { Row, RowDefaultProps } from './row';
export const DateTableBodyDefaultProps = _extends({}, LayoutDefaultProps, {
  // @ts-expect-error Different types between React and Inferno
  cellTemplate: DateTableCellBase
});
export class DateTableBody extends BaseInfernoComponent {
  render() {
    const {
      viewData,
      viewContext,
      addVerticalSizesClassToRows,
      cellTemplate,
      dataCellTemplate
    } = this.props;
    const rowClasses = combineClasses({
      [DATE_TABLE_ROW_CLASS]: true,
      'dx-scheduler-cell-sizes-vertical': addVerticalSizesClassToRows
    });
    const CellTemplateComponent = getTemplate(cellTemplate);
    const DataCellTemplateComponent = getTemplate(dataCellTemplate);
    return createFragment(viewData.groupedData.map(_ref => {
      let {
        allDayPanel,
        dateTable,
        isGroupedAllDayPanel,
        key: fragmentKey
      } = _ref;
      return createFragment([
      // @ts-ignore
      isGroupedAllDayPanel && createComponentVNode(2, AllDayPanelTableBody, {
        "viewData": allDayPanel ?? AllDayPanelTableBodyDefaultProps.viewData,
        "viewContext": viewContext,
        "dataCellTemplate": DataCellTemplateComponent,
        "isVerticalGroupOrientation": true,
        "leftVirtualCellWidth": viewData.leftVirtualCellWidth ?? AllDayPanelTableBodyDefaultProps.leftVirtualCellWidth,
        "rightVirtualCellWidth": viewData.rightVirtualCellWidth ?? AllDayPanelTableBodyDefaultProps.rightVirtualCellWidth,
        "leftVirtualCellCount": viewData.leftVirtualCellCount,
        "rightVirtualCellCount": viewData.rightVirtualCellCount
      }), dateTable.map(_ref2 => {
        let {
          cells,
          key: rowKey
        } = _ref2;
        return (// @ts-ignore
          createComponentVNode(2, Row, {
            "className": rowClasses,
            "leftVirtualCellWidth": viewData.leftVirtualCellWidth ?? RowDefaultProps.leftVirtualCellWidth,
            "rightVirtualCellWidth": viewData.rightVirtualCellWidth ?? RowDefaultProps.rightVirtualCellWidth,
            "leftVirtualCellCount": viewData.leftVirtualCellCount,
            "rightVirtualCellCount": viewData.rightVirtualCellCount,
            children: cells.map(_ref3 => {
              let {
                key: cellKey,
                endDate,
                firstDayOfMonth,
                groupIndex: cellGroupIndex,
                groups,
                index: cellIndex,
                isFirstGroupCell,
                isFocused,
                isLastGroupCell,
                isSelected,
                otherMonth,
                startDate,
                text,
                today
              } = _ref3;
              return CellTemplateComponent({
                key: cellKey,
                viewContext,
                isFirstGroupCell,
                isLastGroupCell,
                startDate,
                endDate,
                groups,
                groupIndex: cellGroupIndex,
                index: cellIndex,
                dataCellTemplate: DataCellTemplateComponent,
                text,
                today,
                otherMonth,
                firstDayOfMonth,
                isSelected,
                isFocused
              });
            })
          }, rowKey)
        );
      })], 0, fragmentKey);
    }), 0);
  }
}
DateTableBody.defaultProps = DateTableBodyDefaultProps;