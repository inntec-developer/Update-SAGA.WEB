import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerExamenTecnicoComponent } from './ver-examen-tecnico.component';

describe('VerExamenTecnicoComponent', () => {
  let component: VerExamenTecnicoComponent;
  let fixture: ComponentFixture<VerExamenTecnicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerExamenTecnicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerExamenTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
