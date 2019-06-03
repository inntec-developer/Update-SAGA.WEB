import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DTHistorialComponent } from './dthistorial.component';

describe('DTHistorialComponent', () => {
  let component: DTHistorialComponent;
  let fixture: ComponentFixture<DTHistorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DTHistorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DTHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
