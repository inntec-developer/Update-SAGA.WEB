import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgTakeFotoComponent } from './dlg-take-foto.component';

describe('DlgTakeFotoComponent', () => {
  let component: DlgTakeFotoComponent;
  let fixture: ComponentFixture<DlgTakeFotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlgTakeFotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgTakeFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
