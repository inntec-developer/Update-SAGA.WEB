import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonClosedComponent } from './button-closed.component';

describe('ButtonClosedComponent', () => {
  let component: ButtonClosedComponent;
  let fixture: ComponentFixture<ButtonClosedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonClosedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
