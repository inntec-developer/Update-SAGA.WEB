import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtPsicometriasClienteComponent } from './dt-psicometrias-cliente.component';

describe('DtPsicometriasClienteComponent', () => {
  let component: DtPsicometriasClienteComponent;
  let fixture: ComponentFixture<DtPsicometriasClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtPsicometriasClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtPsicometriasClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
