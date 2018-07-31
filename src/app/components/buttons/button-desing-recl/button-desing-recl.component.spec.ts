import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDesingReclComponent } from './button-desing-recl.component';

describe('ButtonDesingReclComponent', () => {
  let component: ButtonDesingReclComponent;
  let fixture: ComponentFixture<ButtonDesingReclComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonDesingReclComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonDesingReclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
