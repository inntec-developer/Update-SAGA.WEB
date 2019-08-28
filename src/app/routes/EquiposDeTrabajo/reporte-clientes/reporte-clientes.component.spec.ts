import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteClientesComponent } from './reporte-clientes.component';

describe('ReporteClientesComponent', () => {
  let component: ReporteClientesComponent;
  let fixture: ComponentFixture<ReporteClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
