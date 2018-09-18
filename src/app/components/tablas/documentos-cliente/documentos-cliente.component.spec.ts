import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosClienteComponent } from './documentos-cliente.component';

describe('DocumentosClienteComponent', () => {
  let component: DocumentosClienteComponent;
  let fixture: ComponentFixture<DocumentosClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentosClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
