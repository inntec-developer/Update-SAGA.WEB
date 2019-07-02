import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorUndNegocioGdlComponent } from './indicador-und-negocio-gdl.component';

describe('IndicadorUndNegocioGdlComponent', () => {
  let component: IndicadorUndNegocioGdlComponent;
  let fixture: ComponentFixture<IndicadorUndNegocioGdlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadorUndNegocioGdlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorUndNegocioGdlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
