import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtCompetenciaCardinalComponent } from './dt-competencia-cardinal.component';

describe('DtCompetenciaCardinalComponent', () => {
  let component: DtCompetenciaCardinalComponent;
  let fixture: ComponentFixture<DtCompetenciaCardinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtCompetenciaCardinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtCompetenciaCardinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
