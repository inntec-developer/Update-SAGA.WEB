import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaCaptadoContratadoComponent } from './grafica-captado-contratado.component';

describe('GraficaCaptadoContratadoComponent', () => {
  let component: GraficaCaptadoContratadoComponent;
  let fixture: ComponentFixture<GraficaCaptadoContratadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaCaptadoContratadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaCaptadoContratadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
