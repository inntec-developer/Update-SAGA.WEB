import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCampoComponent } from './web-campo.component';

describe('WebCampoComponent', () => {
  let component: WebCampoComponent;
  let fixture: ComponentFixture<WebCampoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebCampoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebCampoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
