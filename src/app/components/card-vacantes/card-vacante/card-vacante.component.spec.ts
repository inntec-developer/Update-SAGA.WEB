import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVacanteComponent } from './card-vacante.component';

describe('CardVacanteComponent', () => {
  let component: CardVacanteComponent;
  let fixture: ComponentFixture<CardVacanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardVacanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardVacanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
