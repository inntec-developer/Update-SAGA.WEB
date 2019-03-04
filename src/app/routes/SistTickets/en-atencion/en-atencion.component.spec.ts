import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnAtencionComponent } from './en-atencion.component';

describe('EnAtencionComponent', () => {
  let component: EnAtencionComponent;
  let fixture: ComponentFixture<EnAtencionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnAtencionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
