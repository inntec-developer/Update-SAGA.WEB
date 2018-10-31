import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgRequisicionPausaComponent } from './dlg-requisicion-pausa.component';

describe('DlgRequisicionPausaComponent', () => {
  let component: DlgRequisicionPausaComponent;
  let fixture: ComponentFixture<DlgRequisicionPausaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlgRequisicionPausaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgRequisicionPausaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
