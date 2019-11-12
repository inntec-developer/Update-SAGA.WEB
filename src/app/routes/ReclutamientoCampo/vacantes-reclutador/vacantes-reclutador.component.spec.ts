import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacantesReclutadorComponent } from './vacantes-reclutador.component';

describe('VacantesReclutadorComponent', () => {
  let component: VacantesReclutadorComponent;
  let fixture: ComponentFixture<VacantesReclutadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacantesReclutadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacantesReclutadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
