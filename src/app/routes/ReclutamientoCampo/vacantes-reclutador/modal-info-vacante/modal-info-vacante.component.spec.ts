import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoVacanteComponent } from './modal-info-vacante.component';

describe('ModalInfoVacanteComponent', () => {
  let component: ModalInfoVacanteComponent;
  let fixture: ComponentFixture<ModalInfoVacanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalInfoVacanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInfoVacanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
