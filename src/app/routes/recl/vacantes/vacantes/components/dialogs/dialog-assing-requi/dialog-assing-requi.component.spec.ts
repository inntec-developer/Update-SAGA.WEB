import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAssingRequiComponent } from './dialog-assing-requi.component';

describe('DialogAssingRequiComponent', () => {
  let component: DialogAssingRequiComponent;
  let fixture: ComponentFixture<DialogAssingRequiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAssingRequiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAssingRequiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
