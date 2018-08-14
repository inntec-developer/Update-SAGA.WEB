import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioVacanteComponent } from './comentario-vacante.component';

describe('ComentarioVacanteComponent', () => {
  let component: ComentarioVacanteComponent;
  let fixture: ComponentFixture<ComentarioVacanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentarioVacanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentarioVacanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
