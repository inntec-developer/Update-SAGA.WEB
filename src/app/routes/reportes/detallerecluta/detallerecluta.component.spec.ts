import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallereclutaComponent } from './detallerecluta.component';

describe('DetallereclutaComponent', () => {
  let component: DetallereclutaComponent;
  let fixture: ComponentFixture<DetallereclutaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallereclutaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallereclutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
