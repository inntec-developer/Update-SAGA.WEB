import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtCandidatosPostComponent } from './dt-candidatos-post.component';

describe('DtCandidatosPostComponent', () => {
  let component: DtCandidatosPostComponent;
  let fixture: ComponentFixture<DtCandidatosPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtCandidatosPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtCandidatosPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
