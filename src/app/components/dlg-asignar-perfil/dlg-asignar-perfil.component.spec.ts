import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgAsignarPerfilComponent } from './dlg-asignar-perfil.component';

describe('DlgAsignarPerfilComponent', () => {
  let component: DlgAsignarPerfilComponent;
  let fixture: ComponentFixture<DlgAsignarPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlgAsignarPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgAsignarPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
