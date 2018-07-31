import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtCandidatosComponent } from './dt-candidatos.component';

describe('DtCandidatosComponent', () => {
  let component: DtCandidatosComponent;
  let fixture: ComponentFixture<DtCandidatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtCandidatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtCandidatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
