import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgBGArteComponent } from './dlg-bgarte.component';

describe('DlgBGArteComponent', () => {
  let component: DlgBGArteComponent;
  let fixture: ComponentFixture<DlgBGArteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlgBGArteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgBGArteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
