import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalIngresosComponent } from './principal-ingresos.component';

describe('PrincipalIngresosComponent', () => {
  let component: PrincipalIngresosComponent;
  let fixture: ComponentFixture<PrincipalIngresosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalIngresosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
