import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactosClienteComponent } from './contactos-cliente.component';

describe('ContactosClienteComponent', () => {
  let component: ContactosClienteComponent;
  let fixture: ComponentFixture<ContactosClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactosClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
