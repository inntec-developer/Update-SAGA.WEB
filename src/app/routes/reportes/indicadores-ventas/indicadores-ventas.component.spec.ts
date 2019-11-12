import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadoresVentasComponent } from './indicadores-ventas.component';

describe('IndicadoresVentasComponent', () => {
  let component: IndicadoresVentasComponent;
  let fixture: ComponentFixture<IndicadoresVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadoresVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadoresVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
