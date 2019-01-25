import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoProspectoComponent } from './nuevo-prospecto.component';

describe('NuevoProspectoComponent', () => {
  let component: NuevoProspectoComponent;
  let fixture: ComponentFixture<NuevoProspectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoProspectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoProspectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
