import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["viewData", "viewContext", "addDateTableClass", "addVerticalSizesClassToRows", "dataCellTemplate", "groupOrientation", "tableRef", "width"];
import { createComponentVNode, normalizeProps } from "inferno";
import { createReRenderEffect, InfernoWrapperComponent } from '@devextreme/runtime/inferno';
import { getTemplate } from '../../../../core/r1/utils/index';
import { DateTable, DateTableDefaultProps } from '../base/date_table';
import { DateTableMonthCell } from './date_table_month_cell';
export class DateTableMonth extends InfernoWrapperComponent {
  createEffects() {
    return [createReRenderEffect()];
  }
  render() {
    const _this$props = this.props,
      {
        viewData,
        viewContext,
        addDateTableClass,
        addVerticalSizesClassToRows,
        dataCellTemplate,
        groupOrientation,
        tableRef,
        width
      } = _this$props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    const DataCellTemplateComponent = getTemplate(dataCellTemplate);
    return (// @ts-ignore
      normalizeProps(createComponentVNode(2, DateTable, _extends({}, restProps, {
        "viewData": viewData,
        "viewContext": viewContext,
        "groupOrientation": groupOrientation,
        "addDateTableClass": addDateTableClass,
        "dataCellTemplate": DataCellTemplateComponent,
        "cellTemplate": DateTableMonthCell,
        "tableRef": tableRef,
        "addVerticalSizesClassToRows": addVerticalSizesClassToRows,
        "width": width
      })))
    );
  }
}
DateTableMonth.defaultProps = DateTableDefaultProps;