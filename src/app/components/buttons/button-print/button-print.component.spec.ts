import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPrintComponent } from './button-print.component';

describe('ButtonPrintComponent', () => {
  let component: ButtonPrintComponent;
  let fixture: ComponentFixture<ButtonPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
