import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RportAtencionTurnosComponent } from './rport-atencion-turnos.component';

describe('RportAtencionTurnosComponent', () => {
  let component: RportAtencionTurnosComponent;
  let fixture: ComponentFixture<RportAtencionTurnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RportAtencionTurnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RportAtencionTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
