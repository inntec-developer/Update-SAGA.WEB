import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtHorariosComponent } from './dt-horarios.component';

describe('DtHorariosComponent', () => {
  let component: DtHorariosComponent;
  let fixture: ComponentFixture<DtHorariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtHorariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
