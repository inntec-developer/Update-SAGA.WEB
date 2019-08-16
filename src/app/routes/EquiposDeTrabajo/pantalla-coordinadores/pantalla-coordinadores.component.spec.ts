import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaCoordinadoresComponent } from './pantalla-coordinadores.component';

describe('PantallaCoordinadoresComponent', () => {
  let component: PantallaCoordinadoresComponent;
  let fixture: ComponentFixture<PantallaCoordinadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PantallaCoordinadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PantallaCoordinadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
