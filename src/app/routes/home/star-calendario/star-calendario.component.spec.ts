import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarCalendarioComponent } from './star-calendario.component';

describe('StarCalendarioComponent', () => {
  let component: StarCalendarioComponent;
  let fixture: ComponentFixture<StarCalendarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarCalendarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
