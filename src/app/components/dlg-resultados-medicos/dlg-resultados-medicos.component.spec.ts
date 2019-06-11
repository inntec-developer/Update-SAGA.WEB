import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgResultadosMedicosComponent } from './dlg-resultados-medicos.component';

describe('DlgResultadosMedicosComponent', () => {
  let component: DlgResultadosMedicosComponent;
  let fixture: ComponentFixture<DlgResultadosMedicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlgResultadosMedicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgResultadosMedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
