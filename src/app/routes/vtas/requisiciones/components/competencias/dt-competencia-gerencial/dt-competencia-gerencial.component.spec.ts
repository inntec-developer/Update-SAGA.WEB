import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtCompetenciaGerencialComponent } from './dt-competencia-gerencial.component';

describe('DtCompetenciaGerencialComponent', () => {
  let component: DtCompetenciaGerencialComponent;
  let fixture: ComponentFixture<DtCompetenciaGerencialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtCompetenciaGerencialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtCompetenciaGerencialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
