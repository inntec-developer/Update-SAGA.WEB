import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgTransferDamfo290Component } from './dlg-transfer-damfo290.component';

describe('DlgTransferDamfo290Component', () => {
  let component: DlgTransferDamfo290Component;
  let fixture: ComponentFixture<DlgTransferDamfo290Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlgTransferDamfo290Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgTransferDamfo290Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
