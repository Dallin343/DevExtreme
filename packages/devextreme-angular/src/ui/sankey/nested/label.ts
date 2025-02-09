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




import { dxSankeyNode } from 'devextreme/viz/sankey';
import { Font, TextOverflow } from 'devextreme/common/charts';

import {
    NestedOptionHost,
} from 'devextreme-angular/core';
import { NestedOption } from 'devextreme-angular/core';


@Component({
    selector: 'dxo-sankey-label',
    template: '',
    styles: [''],
    providers: [NestedOptionHost]
})
export class DxoSankeyLabelComponent extends NestedOption implements OnDestroy, OnInit  {
    @Input()
    get border(): { color?: string | undefined, visible?: boolean | undefined, width?: number | undefined } {
        return this._getOption('border');
    }
    set border(value: { color?: string | undefined, visible?: boolean | undefined, width?: number | undefined }) {
        this._setOption('border', value);
    }

    @Input()
    get customizeText(): ((itemInfo: dxSankeyNode) => string) {
        return this._getOption('customizeText');
    }
    set customizeText(value: ((itemInfo: dxSankeyNode) => string)) {
        this._setOption('customizeText', value);
    }

    @Input()
    get font(): Font {
        return this._getOption('font');
    }
    set font(value: Font) {
        this._setOption('font', value);
    }

    @Input()
    get horizontalOffset(): number {
        return this._getOption('horizontalOffset');
    }
    set horizontalOffset(value: number) {
        this._setOption('horizontalOffset', value);
    }

    @Input()
    get overlappingBehavior(): TextOverflow {
        return this._getOption('overlappingBehavior');
    }
    set overlappingBehavior(value: TextOverflow) {
        this._setOption('overlappingBehavior', value);
    }

    @Input()
    get shadow(): { blur?: number, color?: string, offsetX?: number, offsetY?: number, opacity?: number } {
        return this._getOption('shadow');
    }
    set shadow(value: { blur?: number, color?: string, offsetX?: number, offsetY?: number, opacity?: number }) {
        this._setOption('shadow', value);
    }

    @Input()
    get useNodeColors(): boolean {
        return this._getOption('useNodeColors');
    }
    set useNodeColors(value: boolean) {
        this._setOption('useNodeColors', value);
    }

    @Input()
    get verticalOffset(): number {
        return this._getOption('verticalOffset');
    }
    set verticalOffset(value: number) {
        this._setOption('verticalOffset', value);
    }

    @Input()
    get visible(): boolean {
        return this._getOption('visible');
    }
    set visible(value: boolean) {
        this._setOption('visible', value);
    }


    protected get _optionPath() {
        return 'label';
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
    DxoSankeyLabelComponent
  ],
  exports: [
    DxoSankeyLabelComponent
  ],
})
export class DxoSankeyLabelModule { }
