import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilaTicketsComponent } from './fila-tickets.component';

describe('FilaTicketsComponent', () => {
  let component: FilaTicketsComponent;
  let fixture: ComponentFixture<FilaTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilaTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilaTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
