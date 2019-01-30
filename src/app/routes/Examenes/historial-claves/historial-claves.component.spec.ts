import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialClavesComponent } from './historial-claves.component';

describe('HistorialClavesComponent', () => {
  let component: HistorialClavesComponent;
  let fixture: ComponentFixture<HistorialClavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialClavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialClavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
