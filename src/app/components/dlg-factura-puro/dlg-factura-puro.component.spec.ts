import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgFacturaPuroComponent } from './dlg-factura-puro.component';

describe('DlgFacturaPuroComponent', () => {
  let component: DlgFacturaPuroComponent;
  let fixture: ComponentFixture<DlgFacturaPuroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlgFacturaPuroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgFacturaPuroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
