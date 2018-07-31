import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtBeneficiosComponent } from './dt-beneficios.component';

describe('DtBeneficiosComponent', () => {
  let component: DtBeneficiosComponent;
  let fixture: ComponentFixture<DtBeneficiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtBeneficiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtBeneficiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
