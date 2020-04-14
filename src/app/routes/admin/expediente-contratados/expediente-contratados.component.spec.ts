import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteContratadosComponent } from './expediente-contratados.component';

describe('ExpedienteContratadosComponent', () => {
  let component: ExpedienteContratadosComponent;
  let fixture: ComponentFixture<ExpedienteContratadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpedienteContratadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedienteContratadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
