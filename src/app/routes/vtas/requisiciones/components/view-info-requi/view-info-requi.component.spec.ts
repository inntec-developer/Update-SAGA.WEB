import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInforRequiComponent } from './view-info-requi.component';

describe('GruposUsuariosComponent', () => {
  let component: ViewInforRequiComponent;
  let fixture: ComponentFixture<ViewInforRequiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInforRequiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInforRequiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
