import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaVacanteActivaComponent } from './grafica-vacante-activa.component';

describe('GraficaVacanteActivaComponent', () => {
  let component: GraficaVacanteActivaComponent;
  let fixture: ComponentFixture<GraficaVacanteActivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaVacanteActivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaVacanteActivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
