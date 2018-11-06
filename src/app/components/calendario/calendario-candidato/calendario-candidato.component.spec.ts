import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioCandidatoComponent } from './calendario-candidato.component';

describe('CalendarioCandidatoComponent', () => {
  let component: CalendarioCandidatoComponent;
  let fixture: ComponentFixture<CalendarioCandidatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarioCandidatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
