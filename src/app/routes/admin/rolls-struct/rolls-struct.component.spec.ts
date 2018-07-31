import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RollsStructComponent } from './rolls-struct.component';

describe('RollsStructComponent', () => {
  let component: RollsStructComponent;
  let fixture: ComponentFixture<RollsStructComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RollsStructComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RollsStructComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
