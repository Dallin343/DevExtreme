/* tslint:disable:component-selector */
import {
  Component,
  ElementRef,
  EventEmitter,
  ViewChild,
  NgZone,
  Input,
  Output,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
  TransferState,
} from '@angular/core';

import {
  TestBed,
} from '@angular/core/testing';

import {
  DxComponent,
  DxTemplateHost,
  DxTemplateModule,
  DxTemplateDirective,
  WatcherHelper,
} from 'devextreme-angular';

// TODO: Try to replace dxButton to Widget ('require' required)
import DxButton from 'devextreme/ui/button';

const DxTestWidget = DxButton;
DxTestWidget.defaultOptions({
  options: {
    elementAttr: { class: 'dx-test-widget' },
  },
});

@Component({
  selector: 'dx-test-widget',
  template: '',
  providers: [DxTemplateHost, WatcherHelper],
})
export class DxTestWidgetComponent extends DxComponent {
  @Input()
  get testTemplate(): any {
    return this._getOption('testTemplate');
  }

  set testTemplate(value: any) {
    this._setOption('testTemplate', value);
  }

  @Output() onOptionChanged = new EventEmitter<any>();

  @Output() testTemplateChange = new EventEmitter<any>();

  constructor(
    elementRef: ElementRef,
    ngZone: NgZone,
    templateHost: DxTemplateHost,
    _watcherHelper: WatcherHelper,
    transferState: TransferState,
    @Inject(PLATFORM_ID) platformId: any,
  ) {
    super(elementRef, ngZone, templateHost, _watcherHelper, transferState, platformId);

    this._createEventEmitters([
      { subscribe: 'optionChanged', emit: 'onOptionChanged' },
      { subscribe: 'initialized', emit: 'onInitialized' },
    ]);
  }

  protected _createInstance(element, options) {
    return new DxTestWidget(element, options);
  }
}

@Component({
  selector: 'dx-test',
  template: '',
  providers: [DxTemplateHost, WatcherHelper],
})
export class DxTestComponent extends DxComponent implements AfterViewInit {
  templates: DxTemplateDirective[];

  constructor(
    elementRef: ElementRef,
    ngZone: NgZone,
    templateHost: DxTemplateHost,
    _watcherHelper: WatcherHelper,
    transferState: TransferState,
    @Inject(PLATFORM_ID) platformId: any,
  ) {
    super(elementRef, ngZone, templateHost, _watcherHelper, transferState, platformId);
  }

  protected _createInstance(element, options) {
    return new DxTestWidget(element, options);
  }

  renderTemplate(model) {
    const element = this.element.nativeElement;
    element.textContent = '';
    this.templates[0].render({
      model,
      container: element,
      index: 5,
    });
  }

  ngAfterViewInit() {
    this.renderTemplate({
      value: () => '',
    });
  }
}

@Component({
  selector: 'test-container-component',
  template: '',
  providers: [DxTemplateHost],
})
export class TestContainerComponent {
  @ViewChild(DxTestWidgetComponent) widget: DxTestWidgetComponent;

  @ViewChild(DxTestComponent) testComponent: DxTestComponent;

  @Output() onInnerElementClicked = new EventEmitter<any>();

  dynamicTemplateName: string;

  constructor() {
    this.dynamicTemplateName = 'start';
  }

  testFunction() {
    this.onInnerElementClicked.next(null);
  }

  switchTemplateName() {
    this.dynamicTemplateName = this.dynamicTemplateName === 'start' ? 'end' : 'start';
  }
}

@Component({
  selector: 'dx-imitation',
  template: `
        <div *dxTemplate="let d of 'ImportedTemlate'">
            <div>123213</div>
        </div>
    `,
})
export class ImitateImportComponent {
  constructor() {
  }
}

describe('DevExtreme Angular widget\'s template', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        declarations: [TestContainerComponent, DxTestWidgetComponent, DxTestComponent],
        imports: [DxTemplateModule],
      },
    );
  });

  // spec
  it('should initialize named templates #17', () => {
    TestBed.overrideComponent(TestContainerComponent, {
      set: {
        template: `
            <dx-test-widget>
                <div *dxTemplate="let d of 'templateName'">Template content</div>
            </dx-test-widget>
           `,
      },
    });
    const fixture = TestBed.createComponent(TestContainerComponent);
    fixture.detectChanges();

    const { instance } = fixture.componentInstance.widget;
    const templatesHash = instance.option('integrationOptions.templates');

    expect(templatesHash.templateName).not.toBeUndefined();
    expect(typeof templatesHash.templateName.render).toBe('function');
  });

  it('should be able to load template imported from another component', () => {
    TestBed.configureTestingModule(
      {
        declarations: [TestContainerComponent, DxTestWidgetComponent, DxTestComponent, ImitateImportComponent],
        imports: [DxTemplateModule],
      },
    );
    TestBed.overrideComponent(TestContainerComponent, {
      set: {
        template: `
                    <dx-test-widget testTemplate="ImportedTemlate">
                        <dx-imitation></dx-imitation>
                    </dx-test-widget>
                `,
      },
    });
    const fixture = TestBed.createComponent(TestContainerComponent);
    fixture.detectChanges();

    const testComponent = fixture.componentInstance;
    const innerComponent = testComponent.widget;
    const templatesHash = innerComponent.instance.option('integrationOptions.templates');
    const template = innerComponent.testTemplate;
    const container = document.createElement('div');

    expect(template).not.toBeUndefined;

    templatesHash[template].render({ container });
    fixture.detectChanges();

    expect(container.children[0].classList.contains('dx-template-wrapper')).toBe(true);
  });

  it('should add template wrapper class as template has root container', () => {
    TestBed.overrideComponent(TestContainerComponent, {
      set: {
        template: `
            <dx-test-widget testTemplate="templateName">
                <div *dxTemplate="let d of 'templateName'">Template content: {{d}}</div>
            </dx-test-widget>
           `,
      },
    });
    const fixture = TestBed.createComponent(TestContainerComponent);
    fixture.detectChanges();

    const testComponent = fixture.componentInstance;
    const innerComponent = testComponent.widget;
    const templatesHash = innerComponent.instance.option('integrationOptions.templates');
    const template = innerComponent.testTemplate;
    const container = document.createElement('div');

    expect(template).not.toBeUndefined;

    templatesHash[template].render({ container });
    fixture.detectChanges();

    expect(container.children[0].classList.contains('dx-template-wrapper')).toBe(true);
  });

  it('should have item index', () => {
    TestBed.overrideComponent(TestContainerComponent, {
      set: {
        template: `
            <dx-test>
                <div *dxTemplate="let d of 'templateName'; let i = index">index: {{i}}</div>
            </dx-test>
           `,
      },
    });
    const fixture = TestBed.createComponent(TestContainerComponent);
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('div');
    expect(element.textContent).toBe('index: 5');
  });

  it('should be created within Angular Zone', () => {
    TestBed.overrideComponent(TestContainerComponent, {
      set: {
        template: `
            <dx-test>
                <div *dxTemplate="let d of 'templateName'">
                    <div class="elem" (click)="d.value()"></div>
                </div>
            </dx-test>
           `,
      },
    });

    const fixture = TestBed.createComponent(TestContainerComponent);
    fixture.detectChanges();

    fixture.ngZone.runOutsideAngular(() => {
      fixture.componentInstance.testComponent.renderTemplate({
        value: () => {
          expect(fixture.ngZone.isStable).toBe(false);
        },
      });
    });

    fixture.nativeElement.querySelector('.elem').click();
  });

  it('should work with dynamic template name', () => {
    TestBed.overrideComponent(TestContainerComponent, {
      set: {
        template: `
            <dx-test-widget [testTemplate]="dynamicTemplateName">
                <div *dxTemplate="let d of dynamicTemplateName">
                    <div [class]="dynamicTemplateName">
                        Template content: {{dynamicTemplateName}}
                    </div>
                </div>
            </dx-test-widget>
           `,
      },
    });
    const fixture = TestBed.createComponent(TestContainerComponent);
    fixture.detectChanges();

    const testComponent = fixture.componentInstance;
    const innerComponent = testComponent.widget;
    const template = innerComponent.testTemplate;
    const templatesHash = innerComponent.instance.option('integrationOptions.templates');
    const container = document.createElement('div');

    expect(template).not.toBeUndefined;

    templatesHash[template].render({ container });
    fixture.detectChanges();

    expect(container.querySelector('.start')).not.toBeNull();

    testComponent.switchTemplateName();
    fixture.detectChanges();
    expect(template).not.toBeUndefined;

    templatesHash[template].render({ container });
    fixture.detectChanges();

    expect(container.querySelector('.end')).not.toBeNull();
  });
});
