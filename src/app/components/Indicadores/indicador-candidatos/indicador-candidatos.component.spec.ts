import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorCandidatosComponent } from './indicador-candidatos.component';

describe('IndicadorCandidatosComponent', () => {
  let component: IndicadorCandidatosComponent;
  let fixture: ComponentFixture<IndicadorCandidatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadorCandidatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorCandidatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
