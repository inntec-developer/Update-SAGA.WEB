import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaClienteComponent } from './grafica-cliente.component';

describe('GraficaClienteComponent', () => {
  let component: GraficaClienteComponent;
  let fixture: ComponentFixture<GraficaClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
