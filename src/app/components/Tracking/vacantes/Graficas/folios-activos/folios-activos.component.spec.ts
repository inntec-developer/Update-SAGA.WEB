import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoliosActivosComponent } from './folios-activos.component';

describe('FoliosActivosComponent', () => {
  let component: FoliosActivosComponent;
  let fixture: ComponentFixture<FoliosActivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoliosActivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoliosActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
