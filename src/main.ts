import './vendor.ts';

import { AppModule } from './app/app.module';
import { Chart } from 'chart.js';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

if (environment.production) {
  enableProdMode();
}

let p = platformBrowserDynamic().bootstrapModule(AppModule);
p.then(() => { (<any>window).appBootstrap && (<any>window).appBootstrap(); })
  .catch(err => console.error(err));

Chart.defaults.scale.ticks.beginAtZero = true;
Chart.defaults.global.animation.duration = 2000;
Chart.defaults.global.animation.easing = 'easeOutExpo';
Chart.defaults.global.legend.display = false;
// Chart.defaults.global.startAngle = 36;
Chart.defaults.global.tooltips.backgroundColor = 'rgba(204, 204, 204, 0.9)';
Chart.defaults.global.tooltips.titleFontColor = 'rgba(59, 59, 59, 1)';
Chart.defaults.global.tooltips.titleFontFamily = "'Lato', sans-serif";
Chart.defaults.global.tooltips.titleFontSize = 16;
Chart.defaults.global.tooltips.titleSpacing = 1;
Chart.defaults.global.tooltips.titleMarginBottom = 10;
Chart.defaults.global.tooltips.bodyFontColor = 'rgba(59, 59, 59, 1)';
Chart.defaults.global.tooltips.bodyFontFamily = "'Lato', sans-serif";
Chart.defaults.global.tooltips.bodyFontSize = 14;
Chart.defaults.global.tooltips.bodySpacing = 1;
Chart.defaults.global.tooltips.xPadding = 10;
Chart.defaults.global.tooltips.yPadding = 10;
Chart.defaults.global.tooltips.cornerRadius = 3;
Chart.defaults.global.tooltips.enabled = true;
Chart.defaults.global.tooltips.mode = 'point';
Chart.defaults.global.tooltips.position = 'nearest';
Chart.defaults.radar.scale.gridLines = true;
