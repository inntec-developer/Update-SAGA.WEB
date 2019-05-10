import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RportTicketsGeneradosComponent } from './rport-tickets-generados.component';

describe('RportTicketsGeneradosComponent', () => {
  let component: RportTicketsGeneradosComponent;
  let fixture: ComponentFixture<RportTicketsGeneradosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RportTicketsGeneradosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RportTicketsGeneradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
