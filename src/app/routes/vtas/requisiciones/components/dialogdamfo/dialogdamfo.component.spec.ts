import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogdamfoComponent } from './dialogdamfo.component';

describe('DialogdamfoComponent', () => {
  let component: DialogdamfoComponent;
  let fixture: ComponentFixture<DialogdamfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogdamfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogdamfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
