import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaReporteComponent } from './grafica-reporte.component';

describe('GraficaReporteComponent', () => {
  let component: GraficaReporteComponent;
  let fixture: ComponentFixture<GraficaReporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaReporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
