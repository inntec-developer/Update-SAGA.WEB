import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselArteVacantesComponent } from './carrusel-arte-vacantes.component';

describe('CarruselArteVacantesComponent', () => {
  let component: CarruselArteVacantesComponent;
  let fixture: ComponentFixture<CarruselArteVacantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarruselArteVacantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarruselArteVacantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
