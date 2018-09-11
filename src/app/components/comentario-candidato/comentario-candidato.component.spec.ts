import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioCandidatoComponent } from './comentario-candidato.component';

describe('ComentarioCandidatoComponent', () => {
  let component: ComentarioCandidatoComponent;
  let fixture: ComponentFixture<ComentarioCandidatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentarioCandidatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentarioCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
