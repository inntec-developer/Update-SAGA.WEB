import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLiberarCandidatoComponent } from './dialog-liberar-candidato.component';

describe('DialogLiberarCandidatoComponent', () => {
  let component: DialogLiberarCandidatoComponent;
  let fixture: ComponentFixture<DialogLiberarCandidatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogLiberarCandidatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLiberarCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
