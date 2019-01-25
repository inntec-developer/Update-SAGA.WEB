import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestarExamenComponent } from './contestar-examen.component';

describe('ContestarExamenComponent', () => {
  let component: ContestarExamenComponent;
  let fixture: ComponentFixture<ContestarExamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestarExamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestarExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
