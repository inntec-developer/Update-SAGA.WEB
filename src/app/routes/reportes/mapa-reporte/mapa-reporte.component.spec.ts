import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaReporteComponent } from './mapa-reporte.component';

describe('MapaReporteComponent', () => {
  let component: MapaReporteComponent;
  let fixture: ComponentFixture<MapaReporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaReporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
