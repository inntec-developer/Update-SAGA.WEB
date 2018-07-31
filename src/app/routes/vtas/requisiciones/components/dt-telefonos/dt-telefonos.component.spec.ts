import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtTelefonosComponent } from './dt-telefonos.component';

describe('DtTelefonosComponent', () => {
  let component: DtTelefonosComponent;
  let fixture: ComponentFixture<DtTelefonosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtTelefonosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtTelefonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
