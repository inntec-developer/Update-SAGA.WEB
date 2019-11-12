import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgCandidatoToRequiComponent } from './dlg-candidato-to-requi.component';

describe('DlgCandidatoToRequiComponent', () => {
  let component: DlgCandidatoToRequiComponent;
  let fixture: ComponentFixture<DlgCandidatoToRequiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlgCandidatoToRequiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgCandidatoToRequiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
