import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatosEnProcesoComponent } from './candidatos-en-proceso.component';

describe('CandidatosEnProcesoComponent', () => {
  let component: CandidatosEnProcesoComponent;
  let fixture: ComponentFixture<CandidatosEnProcesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatosEnProcesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatosEnProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
