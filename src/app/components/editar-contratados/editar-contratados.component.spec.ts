import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarContratadosComponent } from './editar-contratados.component';

describe('EditarContratadosComponent', () => {
  let component: EditarContratadosComponent;
  let fixture: ComponentFixture<EditarContratadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarContratadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarContratadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
