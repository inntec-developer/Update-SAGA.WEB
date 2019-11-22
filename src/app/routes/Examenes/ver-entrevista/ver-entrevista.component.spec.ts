import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VerEntrevistaComponent } from './ver-entrevista.component';



describe('VerEntrevistaComponent', () => {
  let component: VerEntrevistaComponent;
  let fixture: ComponentFixture<VerEntrevistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerEntrevistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerEntrevistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
