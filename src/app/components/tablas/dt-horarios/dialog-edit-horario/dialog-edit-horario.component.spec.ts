import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditHorarioComponent } from './dialog-edit-horario.component';

describe('DialogEditHorarioComponent', () => {
  let component: DialogEditHorarioComponent;
  let fixture: ComponentFixture<DialogEditHorarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditHorarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
