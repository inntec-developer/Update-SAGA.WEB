import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselVacantesComponent } from './carrusel-vacantes.component';

describe('CarruselVacantesComponent', () => {
  let component: CarruselVacantesComponent;
  let fixture: ComponentFixture<CarruselVacantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarruselVacantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarruselVacantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
