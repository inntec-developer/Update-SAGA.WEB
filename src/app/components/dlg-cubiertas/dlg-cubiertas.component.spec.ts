import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgCubiertasComponent } from './dlg-cubiertas.component';

describe('DlgCubiertasComponent', () => {
  let component: DlgCubiertasComponent;
  let fixture: ComponentFixture<DlgCubiertasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlgCubiertasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgCubiertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
