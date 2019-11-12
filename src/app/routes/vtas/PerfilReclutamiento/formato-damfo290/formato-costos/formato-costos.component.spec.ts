import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatoCostosComponent } from './formato-costos.component';

describe('FormatoCostosComponent', () => {
  let component: FormatoCostosComponent;
  let fixture: ComponentFixture<FormatoCostosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatoCostosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatoCostosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
