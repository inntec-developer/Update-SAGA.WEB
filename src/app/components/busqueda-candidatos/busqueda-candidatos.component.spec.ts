import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaCandidatosComponent } from './busqueda-candidatos.component';

describe('BusquedaCandidatosComponent', () => {
  let component: BusquedaCandidatosComponent;
  let fixture: ComponentFixture<BusquedaCandidatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaCandidatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaCandidatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
