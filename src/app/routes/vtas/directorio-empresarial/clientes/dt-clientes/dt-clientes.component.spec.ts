import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtClientesComponent } from './dt-clientes.component';

describe('DtClientesComponent', () => {
  let component: DtClientesComponent;
  let fixture: ComponentFixture<DtClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
