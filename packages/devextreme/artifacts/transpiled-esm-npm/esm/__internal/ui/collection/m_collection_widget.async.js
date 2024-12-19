import { noop } from '../../../core/utils/common';
import { Deferred, when } from '../../../core/utils/deferred';
import CollectionWidgetEdit from './m_collection_widget.edit';
const AsyncCollectionWidget = CollectionWidgetEdit.inherit({
  _initMarkup() {
    this._asyncTemplateItems = [];
    this.callBase();
  },
  _render() {
    this.callBase(arguments);
    this._planPostRenderActions();
  },
  _renderItemContent(args) {
    const renderContentDeferred = Deferred();
    const itemDeferred = Deferred();
    this._asyncTemplateItems[args.index] = itemDeferred;
    const $itemContent = this.callBase(args);
    itemDeferred.done(() => {
      renderContentDeferred.resolve($itemContent);
    });
    return renderContentDeferred.promise();
  },
  _onItemTemplateRendered(itemTemplate, renderArgs) {
    return () => {
      var _this$_asyncTemplateI;
      (_this$_asyncTemplateI = this._asyncTemplateItems[renderArgs.index]) === null || _this$_asyncTemplateI === void 0 || _this$_asyncTemplateI.resolve();
    };
  },
  _postProcessRenderItems: noop,
  _planPostRenderActions() {
    const d = Deferred();
    when.apply(this, this._asyncTemplateItems).done(() => {
      this._postProcessRenderItems();
      d.resolve();
    });
    return d.promise();
  },
  _clean() {
    this.callBase();
    this._asyncTemplateItems.forEach(item => {
      item.reject();
    });
    this._asyncTemplateItems = [];
  }
});
export default AsyncCollectionWidget;