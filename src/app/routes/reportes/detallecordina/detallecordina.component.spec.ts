import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallecordinaComponent } from './detallecordina.component';

describe('DetallecordinaComponent', () => {
  let component: DetallecordinaComponent;
  let fixture: ComponentFixture<DetallecordinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallecordinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallecordinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
