import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaVacantesPieComponent } from './grafica-vacantes-pie.component';

describe('GraficaVacantesPieComponent', () => {
  let component: GraficaVacantesPieComponent;
  let fixture: ComponentFixture<GraficaVacantesPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaVacantesPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaVacantesPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
