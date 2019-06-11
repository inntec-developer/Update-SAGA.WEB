import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarResultMedicosComponent } from './agregar-result-medicos.component';

describe('AgregarResultMedicosComponent', () => {
  let component: AgregarResultMedicosComponent;
  let fixture: ComponentFixture<AgregarResultMedicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarResultMedicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarResultMedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
