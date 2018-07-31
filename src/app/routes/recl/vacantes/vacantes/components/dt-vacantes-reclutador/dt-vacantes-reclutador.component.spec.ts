import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtVacantesReclutadorComponent } from './dt-vacantes-reclutador.component';

describe('DtVacantesReclutadorComponent', () => {
  let component: DtVacantesReclutadorComponent;
  let fixture: ComponentFixture<DtVacantesReclutadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtVacantesReclutadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtVacantesReclutadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
