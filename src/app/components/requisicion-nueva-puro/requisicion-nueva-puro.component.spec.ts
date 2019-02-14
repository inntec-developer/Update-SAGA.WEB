import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisicionNuevaPuroComponent } from './requisicion-nueva-puro.component';

describe('RequisicionNuevaPuroComponent', () => {
  let component: RequisicionNuevaPuroComponent;
  let fixture: ComponentFixture<RequisicionNuevaPuroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisicionNuevaPuroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisicionNuevaPuroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
