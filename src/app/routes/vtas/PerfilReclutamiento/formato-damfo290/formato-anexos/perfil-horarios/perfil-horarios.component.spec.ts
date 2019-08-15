import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilHorariosComponent } from './perfil-horarios.component';

describe('PerfilHorariosComponent', () => {
  let component: PerfilHorariosComponent;
  let fixture: ComponentFixture<PerfilHorariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilHorariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
