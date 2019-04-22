import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioKioscoComponent } from './inicio-kiosco.component';

describe('InicioKioscoComponent', () => {
  let component: InicioKioscoComponent;
  let fixture: ComponentFixture<InicioKioscoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioKioscoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioKioscoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
