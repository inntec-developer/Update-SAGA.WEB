import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorFoliosComponent } from './indicador-folios.component';

describe('IndicadorFoliosComponent', () => {
  let component: IndicadorFoliosComponent;
  let fixture: ComponentFixture<IndicadorFoliosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadorFoliosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorFoliosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
