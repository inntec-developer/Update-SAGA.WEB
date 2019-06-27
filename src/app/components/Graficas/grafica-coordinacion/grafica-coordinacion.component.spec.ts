import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaCoordinacionComponent } from './grafica-coordinacion.component';

describe('GraficaCoordinacionComponent', () => {
  let component: GraficaCoordinacionComponent;
  let fixture: ComponentFixture<GraficaCoordinacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaCoordinacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaCoordinacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
