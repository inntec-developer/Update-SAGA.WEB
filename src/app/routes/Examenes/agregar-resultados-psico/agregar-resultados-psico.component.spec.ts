import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarResultadosPsicoComponent } from './agregar-resultados-psico.component';

describe('AgregarResultadosPsicoComponent', () => {
  let component: AgregarResultadosPsicoComponent;
  let fixture: ComponentFixture<AgregarResultadosPsicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarResultadosPsicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarResultadosPsicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
