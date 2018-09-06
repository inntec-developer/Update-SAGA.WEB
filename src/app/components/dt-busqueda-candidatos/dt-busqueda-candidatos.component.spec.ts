import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtBusquedaCandidatosComponent } from './dt-busqueda-candidatos.component';

describe('DtBusquedaCandidatosComponent', () => {
  let component: DtBusquedaCandidatosComponent;
  let fixture: ComponentFixture<DtBusquedaCandidatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtBusquedaCandidatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtBusquedaCandidatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
