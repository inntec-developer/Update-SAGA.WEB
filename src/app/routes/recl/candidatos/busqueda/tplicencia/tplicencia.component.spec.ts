import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TplicenciaComponent } from './tplicencia.component';

describe('TplicenciaComponent', () => {
  let component: TplicenciaComponent;
  let fixture: ComponentFixture<TplicenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TplicenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TplicenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
