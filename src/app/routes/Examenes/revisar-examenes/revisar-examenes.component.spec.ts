import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarExamenesComponent } from './revisar-examenes.component';

describe('RevisarExamenesComponent', () => {
  let component: RevisarExamenesComponent;
  let fixture: ComponentFixture<RevisarExamenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisarExamenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisarExamenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
