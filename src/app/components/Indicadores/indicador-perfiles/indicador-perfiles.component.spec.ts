import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorPerfilesComponent } from './indicador-perfiles.component';

describe('IndicadorPerfilesComponent', () => {
  let component: IndicadorPerfilesComponent;
  let fixture: ComponentFixture<IndicadorPerfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadorPerfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorPerfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
