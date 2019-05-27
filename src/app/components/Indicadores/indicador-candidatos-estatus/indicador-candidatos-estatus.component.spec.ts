import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorCandidatosEstatusComponent } from './indicador-candidatos-estatus.component';

describe('IndicadorCandidatosEstatusComponent', () => {
  let component: IndicadorCandidatosEstatusComponent;
  let fixture: ComponentFixture<IndicadorCandidatosEstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadorCandidatosEstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorCandidatosEstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
