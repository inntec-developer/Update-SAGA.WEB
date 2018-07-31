import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCheckComponent } from './button-check.component';

describe('ButtonCheckComponent', () => {
  let component: ButtonCheckComponent;
  let fixture: ComponentFixture<ButtonCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
