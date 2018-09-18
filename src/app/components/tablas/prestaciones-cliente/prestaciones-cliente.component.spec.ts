import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestacionesClienteComponent } from './prestaciones-cliente.component';

describe('PrestacionesClienteComponent', () => {
  let component: PrestacionesClienteComponent;
  let fixture: ComponentFixture<PrestacionesClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestacionesClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestacionesClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
