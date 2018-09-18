import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosDamsaComponent } from './documentos-damsa.component';

describe('DocumentosDamsaComponent', () => {
  let component: DocumentosDamsaComponent;
  let fixture: ComponentFixture<DocumentosDamsaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentosDamsaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosDamsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
