import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgTransferComponent } from './dlg-transfer.component';

describe('DlgTransferComponent', () => {
  let component: DlgTransferComponent;
  let fixture: ComponentFixture<DlgTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlgTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
