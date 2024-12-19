import { createVNode, createComponentVNode } from "inferno";
import { BaseInfernoComponent, normalizeStyles } from '@devextreme/runtime/inferno';
import { renderUtils } from '../../utils/index';
import { VirtualRow, VirtualRowDefaultProps } from './virtual_row';
export const TableDefaultProps = {
  topVirtualRowHeight: 0,
  bottomVirtualRowHeight: 0,
  leftVirtualCellWidth: 0,
  rightVirtualCellWidth: 0,
  virtualCellsCount: 0
};
export class Table extends BaseInfernoComponent {
  getResultStyles() {
    const {
      height,
      width,
      styles
    } = this.props;
    const heightAdded = renderUtils.addHeightToStyle(height, styles);
    return renderUtils.addWidthToStyle(width, heightAdded);
  }
  render() {
    const {
      className,
      topVirtualRowHeight,
      bottomVirtualRowHeight,
      children,
      leftVirtualCellCount,
      leftVirtualCellWidth,
      rightVirtualCellCount,
      rightVirtualCellWidth,
      tableRef,
      virtualCellsCount
    } = this.props;
    const hasTopVirtualRow = !!topVirtualRowHeight;
    const hasBottomVirtualRow = !!bottomVirtualRowHeight;
    const resultStyles = this.getResultStyles();
    return createVNode(1, "table", className, createVNode(1, "tbody", null, [hasTopVirtualRow && // @ts-ignore
    createComponentVNode(2, VirtualRow, {
      "height": topVirtualRowHeight,
      "cellsCount": virtualCellsCount ?? VirtualRowDefaultProps.cellsCount,
      "leftVirtualCellWidth": leftVirtualCellWidth ?? VirtualRowDefaultProps.leftVirtualCellWidth,
      "rightVirtualCellWidth": rightVirtualCellWidth ?? VirtualRowDefaultProps.rightVirtualCellWidth,
      "leftVirtualCellCount": leftVirtualCellCount,
      "rightVirtualCellCount": rightVirtualCellCount
    }), children, hasBottomVirtualRow && // @ts-ignore
    createComponentVNode(2, VirtualRow, {
      "height": bottomVirtualRowHeight,
      "cellsCount": virtualCellsCount ?? VirtualRowDefaultProps.cellsCount,
      "leftVirtualCellWidth": leftVirtualCellWidth ?? VirtualRowDefaultProps.leftVirtualCellWidth,
      "rightVirtualCellWidth": rightVirtualCellWidth ?? VirtualRowDefaultProps.rightVirtualCellWidth,
      "leftVirtualCellCount": leftVirtualCellCount,
      "rightVirtualCellCount": rightVirtualCellCount
    })], 0), 2, {
      "style": normalizeStyles(resultStyles),
      "aria-hidden": true
    }, null, tableRef);
  }
}
Table.defaultProps = TableDefaultProps;