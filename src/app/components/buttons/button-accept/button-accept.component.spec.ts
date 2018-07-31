import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAcceptComponent } from './button-accept.component';

describe('ButtonAcceptComponent', () => {
  let component: ButtonAcceptComponent;
  let fixture: ComponentFixture<ButtonAcceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonAcceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
