import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtPsicometriasDamsaComponent } from './dt-psicometrias-damsa.component';

describe('DtPsicometriasDamsaComponent', () => {
  let component: DtPsicometriasDamsaComponent;
  let fixture: ComponentFixture<DtPsicometriasDamsaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtPsicometriasDamsaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtPsicometriasDamsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
