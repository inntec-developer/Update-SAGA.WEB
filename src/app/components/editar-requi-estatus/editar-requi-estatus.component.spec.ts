import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRequiEstatusComponent } from './editar-requi-estatus.component';

describe('EditarRequiEstatusComponent', () => {
  let component: EditarRequiEstatusComponent;
  let fixture: ComponentFixture<EditarRequiEstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarRequiEstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarRequiEstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
