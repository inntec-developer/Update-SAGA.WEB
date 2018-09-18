import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoVacanteComponent } from './info-vacante.component';

describe('InfoVacanteComponent', () => {
  let component: InfoVacanteComponent;
  let fixture: ComponentFixture<InfoVacanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoVacanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoVacanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
