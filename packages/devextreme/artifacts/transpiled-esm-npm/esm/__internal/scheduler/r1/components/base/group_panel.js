import _extends from "@babel/runtime/helpers/esm/extends";
import { createComponentVNode } from "inferno";
import { createReRenderEffect, InfernoWrapperComponent } from '@devextreme/runtime/inferno';
import { getTemplate } from '../../../../core/r1/utils/index';
import { VERTICAL_GROUP_ORIENTATION } from '../../const';
import { isVerticalGroupingApplied } from '../../utils/index';
import { GroupPanelHorizontal } from './group_panel_horizontal';
import { GroupPanelBaseDefaultProps } from './group_panel_props';
import { GroupPanelVertical } from './group_panel_vertical';
export const GroupPanelDefaultProps = _extends({}, GroupPanelBaseDefaultProps, {
  groups: [],
  groupOrientation: VERTICAL_GROUP_ORIENTATION
});
export class GroupPanel extends InfernoWrapperComponent {
  // eslint-disable-next-line class-methods-use-this
  createEffects() {
    return [createReRenderEffect()];
  }
  render() {
    const {
      className,
      viewContext,
      elementRef,
      groupPanelData,
      height,
      resourceCellTemplate,
      groupOrientation,
      groups,
      styles
    } = this.props;
    const ResourceCellTemplateComponent = getTemplate(resourceCellTemplate);
    const isVerticalLayout = isVerticalGroupingApplied(groups, groupOrientation);
    const Layout = isVerticalLayout ? GroupPanelVertical : GroupPanelHorizontal;
    return (// @ts-ignore
      createComponentVNode(2, Layout, {
        "viewContext": viewContext,
        "height": height,
        "resourceCellTemplate": ResourceCellTemplateComponent,
        "className": className,
        "groupPanelData": groupPanelData,
        "elementRef": elementRef,
        "styles": styles,
        "groups": GroupPanelDefaultProps.groups,
        "groupOrientation": GroupPanelDefaultProps.groupOrientation,
        "groupByDate": GroupPanelDefaultProps.groupByDate
      })
    );
  }
}
GroupPanel.defaultProps = GroupPanelDefaultProps;