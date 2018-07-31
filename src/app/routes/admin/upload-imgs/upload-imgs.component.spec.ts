import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImgsComponent } from './upload-imgs.component';

describe('UploadImgsComponent', () => {
  let component: UploadImgsComponent;
  let fixture: ComponentFixture<UploadImgsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadImgsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadImgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
