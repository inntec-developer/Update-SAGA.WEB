import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorUndNegocioMtyComponent } from './indicador-und-negocio-mty.component';

describe('IndicadorUndNegocioMtyComponent', () => {
  let component: IndicadorUndNegocioMtyComponent;
  let fixture: ComponentFixture<IndicadorUndNegocioMtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadorUndNegocioMtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorUndNegocioMtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
