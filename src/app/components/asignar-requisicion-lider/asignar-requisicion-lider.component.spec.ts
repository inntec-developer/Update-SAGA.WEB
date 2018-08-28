import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarRequisicionLiderComponent } from './asignar-requisicion-lider.component';

describe('AsignarRequisicionLiderComponent', () => {
  let component: AsignarRequisicionLiderComponent;
  let fixture: ComponentFixture<AsignarRequisicionLiderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarRequisicionLiderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarRequisicionLiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
