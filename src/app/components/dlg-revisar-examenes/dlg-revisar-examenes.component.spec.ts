import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgRevisarExamenesComponent } from './dlg-revisar-examenes.component';

describe('DlgRevisarExamenesComponent', () => {
  let component: DlgRevisarExamenesComponent;
  let fixture: ComponentFixture<DlgRevisarExamenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlgRevisarExamenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgRevisarExamenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
