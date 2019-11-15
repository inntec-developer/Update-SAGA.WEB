import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SagaBotComponent } from './saga-bot.component';

describe('SagaBotComponent', () => {
  let component: SagaBotComponent;
  let fixture: ComponentFixture<SagaBotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SagaBotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SagaBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
