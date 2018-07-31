import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCuerpoRequiComponent } from './view-cuerpo-requi.component';

describe('ViewCuerpoRequiComponent', () => {
  let component: ViewCuerpoRequiComponent;
  let fixture: ComponentFixture<ViewCuerpoRequiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCuerpoRequiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCuerpoRequiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
