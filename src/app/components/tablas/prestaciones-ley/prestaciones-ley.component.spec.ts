import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestacionesLeyComponent } from './prestaciones-ley.component';

describe('PrestacionesLeyComponent', () => {
  let component: PrestacionesLeyComponent;
  let fixture: ComponentFixture<PrestacionesLeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestacionesLeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestacionesLeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
