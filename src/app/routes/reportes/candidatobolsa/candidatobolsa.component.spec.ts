import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatobolsaComponent } from './candidatobolsa.component';

describe('CandidatobolsaComponent', () => {
  let component: CandidatobolsaComponent;
  let fixture: ComponentFixture<CandidatobolsaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatobolsaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatobolsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
