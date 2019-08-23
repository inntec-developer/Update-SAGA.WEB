import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisenadorComponent } from './disenador.component';

describe('DisenadorComponent', () => {
  let component: DisenadorComponent;
  let fixture: ComponentFixture<DisenadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisenadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
