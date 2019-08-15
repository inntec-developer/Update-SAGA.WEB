import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaGGComponent } from './pantalla-gg.component';

describe('PantallaGGComponent', () => {
  let component: PantallaGGComponent;
  let fixture: ComponentFixture<PantallaGGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PantallaGGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PantallaGGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
