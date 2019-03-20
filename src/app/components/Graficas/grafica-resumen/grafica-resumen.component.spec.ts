import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaResumenComponent } from './grafica-resumen.component';

describe('GraficaResumenComponent', () => {
  let component: GraficaResumenComponent;
  let fixture: ComponentFixture<GraficaResumenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaResumenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
