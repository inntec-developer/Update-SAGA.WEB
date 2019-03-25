import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingVacantesComponent } from './tracking-vacantes.component';

describe('TrackingVacantesComponent', () => {
  let component: TrackingVacantesComponent;
  let fixture: ComponentFixture<TrackingVacantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingVacantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingVacantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
