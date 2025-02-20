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




import { SingleMultipleOrNone, SelectAllMode } from 'devextreme/common';
import { SelectionSensitivity } from 'devextreme/ui/data_grid';
import { SelectionColumnDisplayMode } from 'devextreme/common/grids';

import {
    NestedOptionHost,
} from 'devextreme-angular/core';
import { NestedOption } from 'devextreme-angular/core';


@Component({
    selector: 'dxo-data-grid-data-grid-selection',
    template: '',
    styles: [''],
    providers: [NestedOptionHost]
})
export class DxoDataGridDataGridSelectionComponent extends NestedOption implements OnDestroy, OnInit  {
    @Input()
    get allowSelectAll(): boolean {
        return this._getOption('allowSelectAll');
    }
    set allowSelectAll(value: boolean) {
        this._setOption('allowSelectAll', value);
    }

    @Input()
    get deferred(): boolean {
        return this._getOption('deferred');
    }
    set deferred(value: boolean) {
        this._setOption('deferred', value);
    }

    @Input()
    get mode(): SingleMultipleOrNone {
        return this._getOption('mode');
    }
    set mode(value: SingleMultipleOrNone) {
        this._setOption('mode', value);
    }

    @Input()
    get selectAllMode(): SelectAllMode {
        return this._getOption('selectAllMode');
    }
    set selectAllMode(value: SelectAllMode) {
        this._setOption('selectAllMode', value);
    }

    @Input()
    get sensitivity(): SelectionSensitivity {
        return this._getOption('sensitivity');
    }
    set sensitivity(value: SelectionSensitivity) {
        this._setOption('sensitivity', value);
    }

    @Input()
    get showCheckBoxesMode(): SelectionColumnDisplayMode {
        return this._getOption('showCheckBoxesMode');
    }
    set showCheckBoxesMode(value: SelectionColumnDisplayMode) {
        this._setOption('showCheckBoxesMode', value);
    }


    protected get _optionPath() {
        return 'selection';
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
    DxoDataGridDataGridSelectionComponent
  ],
  exports: [
    DxoDataGridDataGridSelectionComponent
  ],
})
export class DxoDataGridDataGridSelectionModule { }
