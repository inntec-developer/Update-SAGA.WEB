import './vendor.ts';

import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

if (environment.production) {
    enableProdMode();
}

let p = platformBrowserDynamic().bootstrapModule(AppModule);
p.then(() => { (<any>window).appBootstrap && (<any>window).appBootstrap(); })
// .catch(err => console.error(err));
