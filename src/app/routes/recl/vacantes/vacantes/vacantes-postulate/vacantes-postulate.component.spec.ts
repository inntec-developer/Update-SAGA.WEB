import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacantesPostulateComponent } from './vacantes-postulate.component';

describe('VacantesPostulateComponent', () => {
  let component: VacantesPostulateComponent;
  let fixture: ComponentFixture<VacantesPostulateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacantesPostulateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacantesPostulateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
