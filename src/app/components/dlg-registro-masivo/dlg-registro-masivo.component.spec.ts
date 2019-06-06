import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgRegistroMasivoComponent } from './dlg-registro-masivo.component';

describe('DlgRegistroMasivoComponent', () => {
  let component: DlgRegistroMasivoComponent;
  let fixture: ComponentFixture<DlgRegistroMasivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlgRegistroMasivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgRegistroMasivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
