import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoVacanteComponent } from './seguimiento-vacante.component';

describe('SeguimientoVacanteComponent', () => {
  let component: SeguimientoVacanteComponent;
  let fixture: ComponentFixture<SeguimientoVacanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguimientoVacanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoVacanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
