import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgEditarCandidatosComponent } from './dlg-editar-candidatos.component';

describe('DlgEditarCandidatosComponent', () => {
  let component: DlgEditarCandidatosComponent;
  let fixture: ComponentFixture<DlgEditarCandidatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlgEditarCandidatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgEditarCandidatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
