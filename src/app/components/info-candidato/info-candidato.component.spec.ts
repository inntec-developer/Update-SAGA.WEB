import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCandidatoComponent } from './info-candidato.component';

describe('InfoCandidatoComponent', () => {
  let component: InfoCandidatoComponent;
  let fixture: ComponentFixture<InfoCandidatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCandidatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
