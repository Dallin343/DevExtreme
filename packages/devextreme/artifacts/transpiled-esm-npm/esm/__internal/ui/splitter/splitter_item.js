import Guid from '../../../core/guid';
import $ from '../../../core/renderer';
import CollectionWidgetItem from '../../ui/collection/m_item';
import ResizeHandle from './resize_handle';
// @ts-expect-error dxClass inheritance issue
class SplitterItem extends CollectionWidgetItem {
  constructor($element, options, rawData) {
    super($element, options, rawData);
    this._owner = options.owner;
  }
  _renderResizeHandle() {
    var _this$_rawData;
    if (((_this$_rawData = this._rawData) === null || _this$_rawData === void 0 ? void 0 : _this$_rawData.visible) !== false && !this.isLast()) {
      const id = `dx_${new Guid()}`;
      this._setIdAttr(id);
      const config = this._owner._getResizeHandleConfig(id);
      // @ts-expect-error
      this._resizeHandle = this._owner._createComponent($('<div>'), ResizeHandle, config);
      if (this._resizeHandle && this._$element) {
        $(this._resizeHandle.element()).insertAfter(this._$element);
      }
    }
  }
  _setIdAttr(id) {
    var _this$_$element;
    (_this$_$element = this._$element) === null || _this$_$element === void 0 || _this$_$element.attr('id', id);
  }
  getIndex() {
    return this._owner._getIndexByItemData(this._rawData);
  }
  getResizeHandle() {
    return this._resizeHandle;
  }
  isLast() {
    return this._owner._isLastVisibleItem(this.getIndex());
  }
}
export default SplitterItem;