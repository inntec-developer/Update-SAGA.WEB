import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaReporteComponent } from './tabla-reporte.component';

describe('TablaReporteComponent', () => {
  let component: TablaReporteComponent;
  let fixture: ComponentFixture<TablaReporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaReporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
