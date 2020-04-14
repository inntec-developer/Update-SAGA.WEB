import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaPersonalComponent } from './captura-personal.component';

describe('CapturaPersonalComponent', () => {
  let component: CapturaPersonalComponent;
  let fixture: ComponentFixture<CapturaPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
