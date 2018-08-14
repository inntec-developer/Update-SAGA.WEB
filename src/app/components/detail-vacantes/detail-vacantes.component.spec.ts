import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailVacantesComponent } from './detail-vacantes.component';

describe('DetailVacantesComponent', () => {
  let component: DetailVacantesComponent;
  let fixture: ComponentFixture<DetailVacantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailVacantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailVacantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
