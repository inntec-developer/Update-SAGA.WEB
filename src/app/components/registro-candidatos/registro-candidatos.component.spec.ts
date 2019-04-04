import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCandidatosComponent } from './registro-candidatos.component';

describe('RegistroCandidatosComponent', () => {
  let component: RegistroCandidatosComponent;
  let fixture: ComponentFixture<RegistroCandidatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroCandidatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroCandidatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
