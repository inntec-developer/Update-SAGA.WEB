import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCancelRequiComponent } from './dialog-cancel-requi.component';

describe('DialogCancelRequiComponent', () => {
  let component: DialogCancelRequiComponent;
  let fixture: ComponentFixture<DialogCancelRequiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCancelRequiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCancelRequiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
