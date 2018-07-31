import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRequisicionComponent } from './view-requisicion.component';

describe('ViewRequisicionComponent', () => {
  let component: ViewRequisicionComponent;
  let fixture: ComponentFixture<ViewRequisicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRequisicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRequisicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
