import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReubicacionComponent } from './reubicacion.component';

describe('ReubicacionComponent', () => {
  let component: ReubicacionComponent;
  let fixture: ComponentFixture<ReubicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReubicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReubicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
