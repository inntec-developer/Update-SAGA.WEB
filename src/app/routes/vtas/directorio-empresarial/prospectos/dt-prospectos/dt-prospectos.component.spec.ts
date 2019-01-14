import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtProspectosComponent } from './dt-prospectos.component';

describe('DtProspectosComponent', () => {
  let component: DtProspectosComponent;
  let fixture: ComponentFixture<DtProspectosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtProspectosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtProspectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
