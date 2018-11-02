import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgComentariosNRComponent } from './dlg-comentarios-nr.component';

describe('DlgComentariosNRComponent', () => {
  let component: DlgComentariosNRComponent;
  let fixture: ComponentFixture<DlgComentariosNRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlgComentariosNRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgComentariosNRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
