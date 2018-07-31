import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogActivarRequiComponent } from './dialog-activar-requi.component';

describe('DialogActivarRequiComponent', () => {
  let component: DialogActivarRequiComponent;
  let fixture: ComponentFixture<DialogActivarRequiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogActivarRequiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogActivarRequiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
