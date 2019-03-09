import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgAsignarModuloComponent } from './dlg-asignar-modulo.component';

describe('DlgAsignarModuloComponent', () => {
  let component: DlgAsignarModuloComponent;
  let fixture: ComponentFixture<DlgAsignarModuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlgAsignarModuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgAsignarModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
