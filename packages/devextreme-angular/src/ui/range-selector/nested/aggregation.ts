/* tslint:disable:max-line-length */


import {
    Component,
    OnInit,
    OnDestroy,
    NgModule,
    Host,
    SkipSelf,
    Input
} from '@angular/core';




import { chartPointAggregationInfoObject, chartSeriesObject, ChartSeriesAggregationMethod } from 'devextreme/viz/chart';

import {
    NestedOptionHost,
} from 'devextreme-angular/core';
import { NestedOption } from 'devextreme-angular/core';


@Component({
    selector: 'dxo-range-selector-aggregation',
    template: '',
    styles: [''],
    providers: [NestedOptionHost]
})
export class DxoRangeSelectorAggregationComponent extends NestedOption implements OnDestroy, OnInit  {
    @Input()
    get calculate(): ((aggregationInfo: chartPointAggregationInfoObject, series: chartSeriesObject) => Record<string, any> | Array<Record<string, any>>) | undefined {
        return this._getOption('calculate');
    }
    set calculate(value: ((aggregationInfo: chartPointAggregationInfoObject, series: chartSeriesObject) => Record<string, any> | Array<Record<string, any>>) | undefined) {
        this._setOption('calculate', value);
    }

    @Input()
    get enabled(): boolean {
        return this._getOption('enabled');
    }
    set enabled(value: boolean) {
        this._setOption('enabled', value);
    }

    @Input()
    get method(): ChartSeriesAggregationMethod {
        return this._getOption('method');
    }
    set method(value: ChartSeriesAggregationMethod) {
        this._setOption('method', value);
    }


    protected get _optionPath() {
        return 'aggregation';
    }


    constructor(@SkipSelf() @Host() parentOptionHost: NestedOptionHost,
            @Host() optionHost: NestedOptionHost) {
        super();
        parentOptionHost.setNestedOption(this);
        optionHost.setHost(this, this._fullOptionPath.bind(this));
    }


    ngOnInit() {
        this._addRecreatedComponent();
    }

    ngOnDestroy() {
        this._addRemovedOption(this._getOptionPath());
    }


}

@NgModule({
  declarations: [
    DxoRangeSelectorAggregationComponent
  ],
  exports: [
    DxoRangeSelectorAggregationComponent
  ],
})
export class DxoRangeSelectorAggregationModule { }
