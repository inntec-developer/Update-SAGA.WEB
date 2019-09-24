import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaCalidadVencidaComponent } from './grafica-calidad-vencida.component';

describe('GraficaCalidadVencidaComponent', () => {
  let component: GraficaCalidadVencidaComponent;
  let fixture: ComponentFixture<GraficaCalidadVencidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaCalidadVencidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaCalidadVencidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
