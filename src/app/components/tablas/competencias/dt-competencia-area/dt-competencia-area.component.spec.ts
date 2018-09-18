import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtCompetenciaAreaComponent } from './dt-competencia-area.component';

describe('DtCompetenciaAreaComponent', () => {
  let component: DtCompetenciaAreaComponent;
  let fixture: ComponentFixture<DtCompetenciaAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtCompetenciaAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtCompetenciaAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
