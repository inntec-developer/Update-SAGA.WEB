import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisenadorVacanteComponent } from './disenador-vacante.component';

describe('DisenadorVacanteComponent', () => {
  let component: DisenadorVacanteComponent;
  let fixture: ComponentFixture<DisenadorVacanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisenadorVacanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisenadorVacanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
