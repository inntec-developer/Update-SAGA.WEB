import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarExamenComponent } from './asignar-examen.component';

describe('AsignarExamenComponent', () => {
  let component: AsignarExamenComponent;
  let fixture: ComponentFixture<AsignarExamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarExamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
