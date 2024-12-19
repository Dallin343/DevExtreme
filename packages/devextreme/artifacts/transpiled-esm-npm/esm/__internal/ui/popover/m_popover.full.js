import '../../../ui/toolbar';
import registerComponent from '../../../core/component_registrator';
import { extend } from '../../../core/utils/extend';
import Popover from '../../../ui/popover/ui.popover';
export default class PopoverFull extends Popover {
  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), {
      preventScrollEvents: false
    });
  }
  _getToolbarName() {
    return 'dxToolbar';
  }
}
// @ts-expect-error
PopoverFull.defaultOptions = function (rule) {
  Popover.defaultOptions(rule);
};
// @ts-expect-error
registerComponent('dxPopover', PopoverFull);