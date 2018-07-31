import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInfoRequiComponent } from './update-info-requi.component';

describe('UpdateInfoRequiComponent', () => {
  let component: UpdateInfoRequiComponent;
  let fixture: ComponentFixture<UpdateInfoRequiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateInfoRequiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInfoRequiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
