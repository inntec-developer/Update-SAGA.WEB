import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCitaPruebaComponent } from './ticket-cita-prueba.component';

describe('TicketCitaPruebaComponent', () => {
  let component: TicketCitaPruebaComponent;
  let fixture: ComponentFixture<TicketCitaPruebaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketCitaPruebaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketCitaPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
