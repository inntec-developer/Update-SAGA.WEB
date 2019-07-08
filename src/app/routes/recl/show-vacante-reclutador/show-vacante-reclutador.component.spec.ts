import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVacanteReclutadorComponent } from './show-vacante-reclutador.component';

describe('ShowVacanteReclutadorComponent', () => {
  let component: ShowVacanteReclutadorComponent;
  let fixture: ComponentFixture<ShowVacanteReclutadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowVacanteReclutadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowVacanteReclutadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
