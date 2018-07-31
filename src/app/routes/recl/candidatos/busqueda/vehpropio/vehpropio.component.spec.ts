import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehpropioComponent } from './vehpropio.component';

describe('VehpropioComponent', () => {
  let component: VehpropioComponent;
  let fixture: ComponentFixture<VehpropioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehpropioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehpropioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
