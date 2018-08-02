import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDislikeComponent } from './button-dislike.component';

describe('ButtonDislikeComponent', () => {
  let component: ButtonDislikeComponent;
  let fixture: ComponentFixture<ButtonDislikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonDislikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonDislikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
