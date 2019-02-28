import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Reporte70Component } from './reporte70.component';

describe('Reporte70Component', () => {
  let component: Reporte70Component;
  let fixture: ComponentFixture<Reporte70Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Reporte70Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Reporte70Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
