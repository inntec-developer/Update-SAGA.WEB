import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReclutadoresCampoComponent } from './admin-reclutadores-campo.component';

describe('AdminReclutadoresCampoComponent', () => {
  let component: AdminReclutadoresCampoComponent;
  let fixture: ComponentFixture<AdminReclutadoresCampoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReclutadoresCampoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReclutadoresCampoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
