import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtRutasCamionRequiComponent } from './dt-rutas-camion-requi.component';

describe('DtRutasCamionRequiComponent', () => {
  let component: DtRutasCamionRequiComponent;
  let fixture: ComponentFixture<DtRutasCamionRequiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtRutasCamionRequiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtRutasCamionRequiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
