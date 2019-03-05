import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtVacantesGraficaPAComponent } from './dt-vacantes-grafica-pa.component';

describe('DtVacantesGraficaPAComponent', () => {
  let component: DtVacantesGraficaPAComponent;
  let fixture: ComponentFixture<DtVacantesGraficaPAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtVacantesGraficaPAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtVacantesGraficaPAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
