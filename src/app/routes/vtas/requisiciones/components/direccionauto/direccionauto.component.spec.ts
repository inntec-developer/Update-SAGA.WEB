import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionautoComponent } from './direccionauto.component';

describe('DireccionautoComponent', () => {
  let component: DireccionautoComponent;
  let fixture: ComponentFixture<DireccionautoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DireccionautoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DireccionautoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
