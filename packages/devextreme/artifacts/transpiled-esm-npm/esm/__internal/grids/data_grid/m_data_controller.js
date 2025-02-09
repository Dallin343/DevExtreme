import errors from '../../../ui/widget/ui.errors';
import { DataController, dataControllerModule } from '../../grids/grid_core/data_controller/m_data_controller';
import gridCore from './m_core';
import dataSourceAdapterProvider from './m_data_source_adapter';
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
class DataGridDataController extends DataController {
  _getDataSourceAdapter() {
    return dataSourceAdapterProvider;
  }
  _getSpecificDataSourceOption() {
    const dataSource = this.option('dataSource');
    if (dataSource && !Array.isArray(dataSource) && this.option('keyExpr')) {
      errors.log('W1011');
    }
    return super._getSpecificDataSourceOption();
  }
}
export { DataGridDataController as DataController };
gridCore.registerModule('data', {
  defaultOptions: dataControllerModule.defaultOptions,
  controllers: {
    data: DataGridDataController
  }
});