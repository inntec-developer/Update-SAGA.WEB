import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolGrupoComponent } from './rol-grupo.component';

describe('RolGrupoComponent', () => {
  let component: RolGrupoComponent;
  let fixture: ComponentFixture<RolGrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolGrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
