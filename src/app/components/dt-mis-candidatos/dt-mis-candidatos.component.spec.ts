import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtMisCandidatosComponent } from './dt-mis-candidatos.component';

describe('DtMisCandidatosComponent', () => {
  let component: DtMisCandidatosComponent;
  let fixture: ComponentFixture<DtMisCandidatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtMisCandidatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtMisCandidatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
