import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaProductividadComponent } from './grafica-productividad.component';

describe('GraficaProductividadComponent', () => {
  let component: GraficaProductividadComponent;
  let fixture: ComponentFixture<GraficaProductividadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaProductividadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaProductividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
