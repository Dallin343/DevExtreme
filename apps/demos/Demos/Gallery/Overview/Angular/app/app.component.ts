import { NgModule, Component, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxGalleryModule } from 'devextreme-angular';
import { DxCheckBoxModule, DxCheckBoxTypes } from 'devextreme-angular/ui/check-box';
import { Service, Image } from './app.service';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

let modulePrefix = '';
// @ts-ignore
if (window && window.config.packageConfigPaths) {
  modulePrefix = '/app';
}

@Component({
  selector: 'demo-app',
  providers: [Service],
  templateUrl: `.${modulePrefix}/app.component.html`,
  styleUrls: [`.${modulePrefix}/app.component.css`],
})
export class AppComponent {
  dataSource: Image[];

  slideshowDelay = 2000;

  constructor(service: Service) {
    this.dataSource = service.getImages();
  }

  valueChanged(e: DxCheckBoxTypes.ValueChangedEvent) {
    this.slideshowDelay = e.value ? 2000 : 0;
  }
}

@NgModule({
  imports: [
    BrowserModule,
    DxCheckBoxModule,
    DxGalleryModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
