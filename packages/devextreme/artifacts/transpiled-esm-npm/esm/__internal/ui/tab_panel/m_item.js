import { noop } from '../../../core/utils/common';
import CollectionWidgetItem from '../../ui/collection/m_item';
// @ts-expect-error dxClass inheritance issue
export default class TabPanelItem extends CollectionWidgetItem {
  _renderWatchers() {
    // @ts-expect-error
    this._startWatcher('badge', noop);
    return super._renderWatchers();
  }
}