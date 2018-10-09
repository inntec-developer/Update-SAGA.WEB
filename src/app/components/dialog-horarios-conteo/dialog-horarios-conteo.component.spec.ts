import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHorariosConteoComponent } from './dialog-horarios-conteo.component';

describe('DialogHorariosConteoComponent', () => {
  let component: DialogHorariosConteoComponent;
  let fixture: ComponentFixture<DialogHorariosConteoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogHorariosConteoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHorariosConteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
