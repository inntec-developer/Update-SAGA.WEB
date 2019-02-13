import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtRequisicionReclPuroComponent } from './dt-requisicion-recl-puro.component';

describe('DtRequisicionReclPuroComponent', () => {
  let component: DtRequisicionReclPuroComponent;
  let fixture: ComponentFixture<DtRequisicionReclPuroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtRequisicionReclPuroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtRequisicionReclPuroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
