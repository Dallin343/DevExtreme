/* tslint:disable:max-line-length */


import {
    Component,
    OnInit,
    OnDestroy,
    NgModule,
    Host,
    SkipSelf,
    Input,
    ContentChildren,
    forwardRef,
    QueryList
} from '@angular/core';




import { Command, CustomCommand } from 'devextreme/ui/diagram';

import {
    NestedOptionHost,
} from 'devextreme-angular/core';
import { NestedOption } from 'devextreme-angular/core';
import { DxiDiagramCommandComponent } from './command-dxi';


@Component({
    selector: 'dxo-diagram-context-menu',
    template: '',
    styles: [''],
    providers: [NestedOptionHost]
})
export class DxoDiagramContextMenuComponent extends NestedOption implements OnDestroy, OnInit  {
    @Input()
    get commands(): Array<Command | CustomCommand> {
        return this._getOption('commands');
    }
    set commands(value: Array<Command | CustomCommand>) {
        this._setOption('commands', value);
    }

    @Input()
    get enabled(): boolean {
        return this._getOption('enabled');
    }
    set enabled(value: boolean) {
        this._setOption('enabled', value);
    }


    protected get _optionPath() {
        return 'contextMenu';
    }


    @ContentChildren(forwardRef(() => DxiDiagramCommandComponent))
    get commandsChildren(): QueryList<DxiDiagramCommandComponent> {
        return this._getOption('commands');
    }
    set commandsChildren(value) {
        this.setChildren('commands', value);
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
    DxoDiagramContextMenuComponent
  ],
  exports: [
    DxoDiagramContextMenuComponent
  ],
})
export class DxoDiagramContextMenuModule { }
