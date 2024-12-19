import { createVNode } from "inferno";
import { BaseInfernoComponent, normalizeStyles } from '@devextreme/runtime/inferno';
import { OrdinaryCellDefaultProps } from './ordinary_cell';
export class HeaderCell extends BaseInfernoComponent {
  render() {
    const {
      children,
      className,
      colSpan,
      styles
    } = this.props;
    return createVNode(1, "th", className, children, 0, {
      "style": normalizeStyles(styles),
      "colSpan": colSpan
    });
  }
}
HeaderCell.defaultProps = OrdinaryCellDefaultProps;