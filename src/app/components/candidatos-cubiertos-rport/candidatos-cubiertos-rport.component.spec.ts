import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatosCubiertosRportComponent } from './candidatos-cubiertos-rport.component';

describe('CandidatosCubiertosRportComponent', () => {
  let component: CandidatosCubiertosRportComponent;
  let fixture: ComponentFixture<CandidatosCubiertosRportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatosCubiertosRportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatosCubiertosRportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
