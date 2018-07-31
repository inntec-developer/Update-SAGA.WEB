import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShowRequiComponent } from './dialog-show-requi.component';

describe('DialogShowRequiComponent', () => {
  let component: DialogShowRequiComponent;
  let fixture: ComponentFixture<DialogShowRequiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogShowRequiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogShowRequiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
