import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtCrearRequisicionComponent } from './dt-crear-requisicion.component';

describe('DtCrearRequisicionComponent', () => {
  let component: DtCrearRequisicionComponent;
  let fixture: ComponentFixture<DtCrearRequisicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtCrearRequisicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtCrearRequisicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
