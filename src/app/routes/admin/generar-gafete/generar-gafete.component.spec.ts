import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarGafeteComponent } from './generar-gafete.component';

describe('GenerarGafeteComponent', () => {
  let component: GenerarGafeteComponent;
  let fixture: ComponentFixture<GenerarGafeteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarGafeteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarGafeteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
