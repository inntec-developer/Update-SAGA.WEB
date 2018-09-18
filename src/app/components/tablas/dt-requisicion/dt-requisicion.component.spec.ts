import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtRequisicionComponent } from './dt-requisicion.component';

describe('DtRequisicionComponent', () => {
  let component: DtRequisicionComponent;
  let fixture: ComponentFixture<DtRequisicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtRequisicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtRequisicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
