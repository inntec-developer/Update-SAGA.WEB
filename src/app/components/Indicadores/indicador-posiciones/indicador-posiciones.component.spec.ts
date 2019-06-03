import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorPosicionesComponent } from './indicador-posiciones.component';

describe('IndicadorPosicionesComponent', () => {
  let component: IndicadorPosicionesComponent;
  let fixture: ComponentFixture<IndicadorPosicionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadorPosicionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorPosicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
