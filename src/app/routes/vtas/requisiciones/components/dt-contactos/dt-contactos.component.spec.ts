import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtContactosComponent } from './dt-contactos.component';

describe('DtContactosComponent', () => {
  let component: DtContactosComponent;
  let fixture: ComponentFixture<DtContactosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtContactosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtContactosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
