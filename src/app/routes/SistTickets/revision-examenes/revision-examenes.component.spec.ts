import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionExamenesComponent } from './revision-examenes.component';

describe('RevisionExamenesComponent', () => {
  let component: RevisionExamenesComponent;
  let fixture: ComponentFixture<RevisionExamenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisionExamenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionExamenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
