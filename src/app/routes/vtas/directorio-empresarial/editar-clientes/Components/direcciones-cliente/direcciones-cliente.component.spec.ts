import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionesClienteComponent } from './direcciones-cliente.component';

describe('DireccionesClienteComponent', () => {
  let component: DireccionesClienteComponent;
  let fixture: ComponentFixture<DireccionesClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DireccionesClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DireccionesClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
