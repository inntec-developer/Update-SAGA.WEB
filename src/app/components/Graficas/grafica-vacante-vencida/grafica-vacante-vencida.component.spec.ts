import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaVacanteVencidaComponent } from './grafica-vacante-vencida.component';

describe('GraficaVacanteVencidaComponent', () => {
  let component: GraficaVacanteVencidaComponent;
  let fixture: ComponentFixture<GraficaVacanteVencidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaVacanteVencidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaVacanteVencidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
