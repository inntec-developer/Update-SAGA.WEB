import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopNotificacionesComponent } from './pop-notificaciones.component';

describe('PopNotificacionesComponent', () => {
  let component: PopNotificacionesComponent;
  let fixture: ComponentFixture<PopNotificacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopNotificacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
