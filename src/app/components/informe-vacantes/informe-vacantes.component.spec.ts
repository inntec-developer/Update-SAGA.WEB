import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeVacantesComponent } from './informe-vacantes.component';

describe('InformeVacantesComponent', () => {
  let component: InformeVacantesComponent;
  let fixture: ComponentFixture<InformeVacantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformeVacantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeVacantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
