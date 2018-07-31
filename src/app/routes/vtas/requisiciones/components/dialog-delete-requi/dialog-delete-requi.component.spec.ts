import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteRequiComponent } from './dialog-delete-requi.component';

describe('DialogDeleteRequiComponent', () => {
  let component: DialogDeleteRequiComponent;
  let fixture: ComponentFixture<DialogDeleteRequiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDeleteRequiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteRequiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
