import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCandidatosComponent } from './reporte-candidatos.component';

describe('ReporteCandidatosComponent', () => {
  let component: ReporteCandidatosComponent;
  let fixture: ComponentFixture<ReporteCandidatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteCandidatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteCandidatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
