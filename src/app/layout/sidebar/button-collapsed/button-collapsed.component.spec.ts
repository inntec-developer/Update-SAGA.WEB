import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCollapsedComponent } from './button-collapsed.component';

describe('ButtonCollapsedComponent', () => {
  let component: ButtonCollapsedComponent;
  let fixture: ComponentFixture<ButtonCollapsedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonCollapsedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonCollapsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
