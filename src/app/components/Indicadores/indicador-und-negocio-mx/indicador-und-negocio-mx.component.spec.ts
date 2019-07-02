import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorUndNegocioMxComponent } from './indicador-und-negocio-mx.component';

describe('IndicadorUndNegocioMxComponent', () => {
  let component: IndicadorUndNegocioMxComponent;
  let fixture: ComponentFixture<IndicadorUndNegocioMxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadorUndNegocioMxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorUndNegocioMxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
