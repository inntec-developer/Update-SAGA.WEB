import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarPsicometricosComponent } from './asignar-psicometricos.component';

describe('AsignarPsicometricosComponent', () => {
  let component: AsignarPsicometricosComponent;
  let fixture: ComponentFixture<AsignarPsicometricosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarPsicometricosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarPsicometricosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
