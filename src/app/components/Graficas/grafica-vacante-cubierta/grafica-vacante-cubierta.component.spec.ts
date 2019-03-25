import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaVacanteCubiertaComponent } from './grafica-vacante-cubierta.component';

describe('GraficaVacanteCubiertaComponent', () => {
  let component: GraficaVacanteCubiertaComponent;
  let fixture: ComponentFixture<GraficaVacanteCubiertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaVacanteCubiertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaVacanteCubiertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
