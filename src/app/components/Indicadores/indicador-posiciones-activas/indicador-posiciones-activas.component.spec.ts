import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorPosicionesActivasComponent } from './indicador-posiciones-activas.component';

describe('IndicadorPosicionesActivasComponent', () => {
  let component: IndicadorPosicionesActivasComponent;
  let fixture: ComponentFixture<IndicadorPosicionesActivasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadorPosicionesActivasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorPosicionesActivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
