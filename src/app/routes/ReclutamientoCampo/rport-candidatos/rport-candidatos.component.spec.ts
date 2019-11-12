import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RportCandidatosComponent } from './rport-candidatos.component';

describe('RportCandidatosComponent', () => {
  let component: RportCandidatosComponent;
  let fixture: ComponentFixture<RportCandidatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RportCandidatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RportCandidatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
