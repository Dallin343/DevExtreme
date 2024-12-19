import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable max-classes-per-file */
import { extend } from '../../../core/utils/extend';
import { data as virtualScrollingDataControllerExtender, dataSourceAdapterExtender as virtualScrollingDataSourceAdapterExtender, virtualScrollingModule } from '../../grids/grid_core/virtual_scrolling/m_virtual_scrolling';
import dataSourceAdapterProvider from './data_source_adapter/m_data_source_adapter';
import gridCore from './m_core';
const oldDefaultOptions = virtualScrollingModule.defaultOptions;
virtualScrollingModule.extenders.controllers.data = Base => class TreeListVirtualScrollingDataControllerExtender extends virtualScrollingDataControllerExtender(Base) {
  _loadOnOptionChange() {
    var _this$_dataSource;
    const virtualScrollController = (_this$_dataSource = this._dataSource) === null || _this$_dataSource === void 0 ? void 0 : _this$_dataSource._virtualScrollController;
    virtualScrollController === null || virtualScrollController === void 0 || virtualScrollController.reset();
    // @ts-expect-error
    super._loadOnOptionChange();
  }
};
const dataSourceAdapterExtender = Base => class VirtualScrollingDataSourceAdapterExtender extends virtualScrollingDataSourceAdapterExtender(Base) {
  changeRowExpand() {
    return super.changeRowExpand.apply(this, arguments).done(() => {
      const viewportItemIndex = this.getViewportItemIndex();
      viewportItemIndex >= 0 && this.setViewportItemIndex(viewportItemIndex);
    });
  }
};
gridCore.registerModule('virtualScrolling', _extends({}, virtualScrollingModule, {
  defaultOptions() {
    return extend(true, oldDefaultOptions(), {
      scrolling: {
        mode: 'virtual'
      }
    });
  }
}));
dataSourceAdapterProvider.extend(dataSourceAdapterExtender);