import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaCalidadActivoComponent } from './grafica-calidad-activo.component';

describe('GraficaCalidadActivoComponent', () => {
  let component: GraficaCalidadActivoComponent;
  let fixture: ComponentFixture<GraficaCalidadActivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaCalidadActivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaCalidadActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
