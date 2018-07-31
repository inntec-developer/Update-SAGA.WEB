import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtDamfoComponent } from './dt-damfo.component';

describe('DtDamfoComponent', () => {
  let component: DtDamfoComponent;
  let fixture: ComponentFixture<DtDamfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtDamfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtDamfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
