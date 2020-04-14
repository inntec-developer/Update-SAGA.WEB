import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarContratoComponent } from './generar-contrato.component';

describe('GenerarContratoComponent', () => {
  let component: GenerarContratoComponent;
  let fixture: ComponentFixture<GenerarContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
