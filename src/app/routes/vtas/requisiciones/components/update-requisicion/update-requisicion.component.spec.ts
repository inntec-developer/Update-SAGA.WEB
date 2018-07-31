import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRequisicionComponent } from './update-requisicion.component';

describe('UpdateRequisicionComponent', () => {
  let component: UpdateRequisicionComponent;
  let fixture: ComponentFixture<UpdateRequisicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRequisicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRequisicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
