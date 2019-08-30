import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalExamenesComponent } from './principal-examenes.component';

describe('PrincipalExamenesComponent', () => {
  let component: PrincipalExamenesComponent;
  let fixture: ComponentFixture<PrincipalExamenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalExamenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalExamenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
