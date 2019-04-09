import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorreosClienteComponent } from './correos-cliente.component';

describe('CorreosClienteComponent', () => {
  let component: CorreosClienteComponent;
  let fixture: ComponentFixture<CorreosClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorreosClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorreosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
