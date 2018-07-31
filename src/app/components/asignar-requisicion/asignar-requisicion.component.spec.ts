import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarRequisicionComponent } from './asignar-requisicion.component';

describe('AsignarRequisicionComponent', () => {
  let component: AsignarRequisicionComponent;
  let fixture: ComponentFixture<AsignarRequisicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarRequisicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarRequisicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
