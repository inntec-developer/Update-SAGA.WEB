import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtDirecionRequiComponent } from './dt-direcion-requi.component';

describe('DtDirecionRequiComponent', () => {
  let component: DtDirecionRequiComponent;
  let fixture: ComponentFixture<DtDirecionRequiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtDirecionRequiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtDirecionRequiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
