import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorioEmpresarialComponent } from './directorio-empresarial.component';

describe('DirectorioEmpresarialComponent', () => {
  let component: DirectorioEmpresarialComponent;
  let fixture: ComponentFixture<DirectorioEmpresarialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorioEmpresarialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorioEmpresarialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
