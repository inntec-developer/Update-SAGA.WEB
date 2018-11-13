import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCandidatoEstatusComponent } from './editar-candidato-estatus.component';

describe('EditarCandidatoEstatusComponent', () => {
  let component: EditarCandidatoEstatusComponent;
  let fixture: ComponentFixture<EditarCandidatoEstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarCandidatoEstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCandidatoEstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
