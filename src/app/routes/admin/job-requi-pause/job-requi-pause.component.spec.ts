import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRequiPauseComponent } from './job-requi-pause.component';

describe('JobRequiPauseComponent', () => {
  let component: JobRequiPauseComponent;
  let fixture: ComponentFixture<JobRequiPauseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobRequiPauseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRequiPauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
