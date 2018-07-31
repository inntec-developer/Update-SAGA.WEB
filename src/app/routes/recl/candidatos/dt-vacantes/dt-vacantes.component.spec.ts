import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtVacantesComponent } from './dt-vacantes.component';

describe('DtVacantesComponent', () => {
  let component: DtVacantesComponent;
  let fixture: ComponentFixture<DtVacantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtVacantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtVacantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
