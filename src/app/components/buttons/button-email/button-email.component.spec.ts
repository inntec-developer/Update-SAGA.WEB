import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonEmailComponent } from './button-email.component';

describe('ButtonEmailComponent', () => {
  let component: ButtonEmailComponent;
  let fixture: ComponentFixture<ButtonEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
