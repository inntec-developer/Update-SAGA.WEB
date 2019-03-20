import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaVacantePorvencComponent } from './grafica-vacante-porvenc.component';

describe('GraficaVacantePorvencComponent', () => {
  let component: GraficaVacantePorvencComponent;
  let fixture: ComponentFixture<GraficaVacantePorvencComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaVacantePorvencComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaVacantePorvencComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
