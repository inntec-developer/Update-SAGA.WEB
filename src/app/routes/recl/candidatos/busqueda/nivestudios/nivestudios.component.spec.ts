import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NivestudiosComponent } from './nivestudios.component';

describe('NivestudiosComponent', () => {
  let component: NivestudiosComponent;
  let fixture: ComponentFixture<NivestudiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NivestudiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NivestudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
