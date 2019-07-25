import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorArteRequisicionesComponent } from './editor-arte-requisiciones.component';

describe('EditorArteRequisicionesComponent', () => {
  let component: EditorArteRequisicionesComponent;
  let fixture: ComponentFixture<EditorArteRequisicionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorArteRequisicionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorArteRequisicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
