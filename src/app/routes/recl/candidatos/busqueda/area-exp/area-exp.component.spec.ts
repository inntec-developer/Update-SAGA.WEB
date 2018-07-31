import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaExpComponent } from './area-exp.component';

describe('AreaExpComponent', () => {
  let component: AreaExpComponent;
  let fixture: ComponentFixture<AreaExpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaExpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
