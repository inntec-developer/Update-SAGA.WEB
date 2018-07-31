import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcondiscapacidadComponent } from './pcondiscapacidad.component';

describe('PcondiscapacidadComponent', () => {
  let component: PcondiscapacidadComponent;
  let fixture: ComponentFixture<PcondiscapacidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcondiscapacidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcondiscapacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
