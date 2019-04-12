import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelefonosClienteComponent } from './telefonos-cliente.component';

describe('TelefonosClienteComponent', () => {
  let component: TelefonosClienteComponent;
  let fixture: ComponentFixture<TelefonosClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelefonosClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelefonosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
