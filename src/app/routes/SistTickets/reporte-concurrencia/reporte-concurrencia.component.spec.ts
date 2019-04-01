import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteConcurrenciaComponent } from './reporte-concurrencia.component';

describe('ReporteConcurrenciaComponent', () => {
  let component: ReporteConcurrenciaComponent;
  let fixture: ComponentFixture<ReporteConcurrenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteConcurrenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteConcurrenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
