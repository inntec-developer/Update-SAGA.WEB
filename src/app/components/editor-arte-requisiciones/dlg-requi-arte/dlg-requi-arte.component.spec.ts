import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgRequiArteComponent } from './dlg-requi-arte.component';

describe('DlgRequiArteComponent', () => {
  let component: DlgRequiArteComponent;
  let fixture: ComponentFixture<DlgRequiArteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlgRequiArteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgRequiArteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
