import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CubiertoComponent } from './cubierto.component';

describe('CubiertoComponent', () => {
  let component: CubiertoComponent;
  let fixture: ComponentFixture<CubiertoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CubiertoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CubiertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
