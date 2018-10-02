import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRutasComponent } from './dialog-rutas.component';

describe('DialogRutasComponent', () => {
  let component: DialogRutasComponent;
  let fixture: ComponentFixture<DialogRutasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRutasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
