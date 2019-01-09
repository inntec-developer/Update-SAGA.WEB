import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesContratadosComponent } from './files-contratados.component';

describe('FilesContratadosComponent', () => {
  let component: FilesContratadosComponent;
  let fixture: ComponentFixture<FilesContratadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesContratadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesContratadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
