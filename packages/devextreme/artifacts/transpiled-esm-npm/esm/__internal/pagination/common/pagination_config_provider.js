import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { PaginationConfigContext } from './pagination_config_context';
export const PaginationConfigProviderDefaultProps = {};
export class PaginationConfigProvider extends BaseInfernoComponent {
  constructor() {
    super(...arguments);
    this.state = {};
  }
  getConfig() {
    return {
      isGridCompatibilityMode: this.props.isGridCompatibilityMode
    };
  }
  getChildContext() {
    return _extends({}, this.context, {
      [PaginationConfigContext.id]: this.getConfig() || PaginationConfigContext.defaultValue
    });
  }
  render() {
    return this.props.children;
  }
}
PaginationConfigProvider.defaultProps = PaginationConfigProviderDefaultProps;