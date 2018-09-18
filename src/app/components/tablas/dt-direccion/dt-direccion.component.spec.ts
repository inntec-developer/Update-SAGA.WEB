import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtDireccionComponent } from './dt-direccion.component';

describe('DtDireccionComponent', () => {
  let component: DtDireccionComponent;
  let fixture: ComponentFixture<DtDireccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtDireccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
