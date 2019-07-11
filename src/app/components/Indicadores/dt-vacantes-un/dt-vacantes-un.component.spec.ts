import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtVacantesUNComponent } from './dt-vacantes-un.component';

describe('DtVacantesUNComponent', () => {
  let component: DtVacantesUNComponent;
  let fixture: ComponentFixture<DtVacantesUNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtVacantesUNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtVacantesUNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
