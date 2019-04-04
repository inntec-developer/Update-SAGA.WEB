import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsRegisterComponent } from './tickets-register.component';

describe('TicketsRegisterComponent', () => {
  let component: TicketsRegisterComponent;
  let fixture: ComponentFixture<TicketsRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
