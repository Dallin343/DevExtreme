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




import { Font, TextOverflow } from 'devextreme/common/charts';

import {
    NestedOptionHost,
} from 'devextreme-angular/core';
import { NestedOption } from 'devextreme-angular/core';


@Component({
    selector: 'dxo-tree-map-group',
    template: '',
    styles: [''],
    providers: [NestedOptionHost]
})
export class DxoTreeMapGroupComponent extends NestedOption implements OnDestroy, OnInit  {
    @Input()
    get border(): { color?: string | undefined, width?: number | undefined } {
        return this._getOption('border');
    }
    set border(value: { color?: string | undefined, width?: number | undefined }) {
        this._setOption('border', value);
    }

    @Input()
    get color(): string {
        return this._getOption('color');
    }
    set color(value: string) {
        this._setOption('color', value);
    }

    @Input()
    get headerHeight(): number | undefined {
        return this._getOption('headerHeight');
    }
    set headerHeight(value: number | undefined) {
        this._setOption('headerHeight', value);
    }

    @Input()
    get hoverEnabled(): boolean | undefined {
        return this._getOption('hoverEnabled');
    }
    set hoverEnabled(value: boolean | undefined) {
        this._setOption('hoverEnabled', value);
    }

    @Input()
    get hoverStyle(): { border?: { color?: string | undefined, width?: number | undefined }, color?: string | undefined } {
        return this._getOption('hoverStyle');
    }
    set hoverStyle(value: { border?: { color?: string | undefined, width?: number | undefined }, color?: string | undefined }) {
        this._setOption('hoverStyle', value);
    }

    @Input()
    get label(): { font?: Font, textOverflow?: TextOverflow, visible?: boolean } {
        return this._getOption('label');
    }
    set label(value: { font?: Font, textOverflow?: TextOverflow, visible?: boolean }) {
        this._setOption('label', value);
    }

    @Input()
    get padding(): number {
        return this._getOption('padding');
    }
    set padding(value: number) {
        this._setOption('padding', value);
    }

    @Input()
    get selectionStyle(): { border?: { color?: string | undefined, width?: number | undefined }, color?: string | undefined } {
        return this._getOption('selectionStyle');
    }
    set selectionStyle(value: { border?: { color?: string | undefined, width?: number | undefined }, color?: string | undefined }) {
        this._setOption('selectionStyle', value);
    }


    protected get _optionPath() {
        return 'group';
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
    DxoTreeMapGroupComponent
  ],
  exports: [
    DxoTreeMapGroupComponent
  ],
})
export class DxoTreeMapGroupModule { }
