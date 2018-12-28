import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesReclutadorComponent } from './actividades-reclutador.component';

describe('ActividadesReclutadorComponent', () => {
  let component: ActividadesReclutadorComponent;
  let fixture: ComponentFixture<ActividadesReclutadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadesReclutadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesReclutadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
