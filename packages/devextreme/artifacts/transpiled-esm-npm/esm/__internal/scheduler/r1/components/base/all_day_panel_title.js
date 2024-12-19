import { createVNode } from "inferno";
import { createReRenderEffect, InfernoWrapperComponent } from '@devextreme/runtime/inferno';
import messageLocalization from '../../../../../common/core/localization/message';
export class AllDayPanelTitle extends InfernoWrapperComponent {
  createEffects() {
    return [createReRenderEffect()];
  }
  render() {
    const text = messageLocalization.format('dxScheduler-allDay');
    return createVNode(1, "div", "dx-scheduler-all-day-title", text, 0);
  }
}
AllDayPanelTitle.defaultProps = {};