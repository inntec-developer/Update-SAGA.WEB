import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroReclutadorComponent } from './registro-reclutador.component';

describe('RegistroReclutadorComponent', () => {
  let component: RegistroReclutadorComponent;
  let fixture: ComponentFixture<RegistroReclutadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroReclutadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroReclutadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
