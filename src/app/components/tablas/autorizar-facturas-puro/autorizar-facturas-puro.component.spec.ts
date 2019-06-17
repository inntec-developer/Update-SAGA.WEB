import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizarFacturasPuroComponent } from './autorizar-facturas-puro.component';

describe('AutorizarFacturasPuroComponent', () => {
  let component: AutorizarFacturasPuroComponent;
  let fixture: ComponentFixture<AutorizarFacturasPuroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorizarFacturasPuroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizarFacturasPuroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
