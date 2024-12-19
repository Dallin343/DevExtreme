import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { getTemplate } from '../../../../core/r1/utils/index';
import { combineClasses } from '../../../../core/r1/utils/render_utils';
import { GroupPanelCellDefaultProps } from './group_panel_props';
export const GroupPanelHorizontalCellDefaultProps = _extends({}, GroupPanelCellDefaultProps, {
  isFirstGroupCell: false,
  isLastGroupCell: false,
  colSpan: 1
});
export class GroupPanelHorizontalCell extends BaseInfernoComponent {
  render() {
    const {
      cellTemplate,
      colSpan,
      color,
      data,
      id,
      index,
      text,
      className,
      isFirstGroupCell,
      isLastGroupCell
    } = this.props;
    const classes = combineClasses({
      'dx-scheduler-group-header': true,
      'dx-scheduler-first-group-cell': isFirstGroupCell,
      'dx-scheduler-last-group-cell': isLastGroupCell,
      [className ?? '']: !!className
    });
    const CellTemplateComponent = getTemplate(cellTemplate);
    return createVNode(1, "th", classes, createVNode(1, "div", "dx-scheduler-group-header-content", CellTemplateComponent ? CellTemplateComponent({
      data: {
        data,
        id,
        color,
        text
      },
      index
    }) : createVNode(1, "div", null, text, 0), 0), 2, {
      "colSpan": colSpan
    });
  }
}
GroupPanelHorizontalCell.defaultProps = GroupPanelHorizontalCellDefaultProps;