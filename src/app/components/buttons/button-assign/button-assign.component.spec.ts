import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAssignComponent } from './button-assign.component';

describe('ButtonAssignComponent', () => {
  let component: ButtonAssignComponent;
  let fixture: ComponentFixture<ButtonAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
