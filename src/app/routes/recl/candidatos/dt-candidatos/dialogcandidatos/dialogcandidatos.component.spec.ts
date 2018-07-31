import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcandidatosComponent } from './dialogcandidatos.component';

describe('DialogcandidatosComponent', () => {
  let component: DialogcandidatosComponent;
  let fixture: ComponentFixture<DialogcandidatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogcandidatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogcandidatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
