import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsPostulacionesComponent } from './buttons-postulaciones.component';

describe('ButtonsPostulacionesComponent', () => {
  let component: ButtonsPostulacionesComponent;
  let fixture: ComponentFixture<ButtonsPostulacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonsPostulacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsPostulacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
