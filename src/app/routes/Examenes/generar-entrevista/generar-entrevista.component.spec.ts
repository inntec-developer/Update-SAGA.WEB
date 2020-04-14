import { ToolsModule } from './../../../tools/tools.module';
import { async, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GenerarEntrevistaComponent } from './generar-entrevista.component';
import { ExamenesService } from '../../../service/Examenes/examenes.service';
import { SettingsService } from '../../../core/settings/settings.service';

describe('GenerarEntrevistaComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ToolsModule
      ],
      declarations: [
        GenerarEntrevistaComponent
      ],
      providers: [SettingsService]
    }).compileComponents();
  }));

  it('should create the Generar Entrevista', async(inject([ExamenesService, SettingsService],
    (examenesService, settingsService) => {
   const component = new GenerarEntrevistaComponent(examenesService, settingsService);

   expect(component).toBeTruthy();
 })));

  // it(`should have as title 'angularTesting'`, () => {
  //   const fixture = TestBed.createComponent(GenerarEntrevistaComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('angularTesting');
  // });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(GenerarEntrevistaComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to angularTesting!');
  // });
});


// describe('GenerarEntrevistaComponent', () => {
//   let component: GenerarEntrevistaComponent;
//   let fixture: ComponentFixture<GenerarEntrevistaComponent>;
// let service: ExamenesService;
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ GenerarEntrevistaComponent ],
//       providers: [ExamenesService], // **--passing Mock service**
//       imports: [BrowserModule, FormsModule, ToolsModule, Router]
//     })
//     .compileComponents();

//     beforeEach(() => {
//       fixture = TestBed.createComponent(GenerarEntrevistaComponent);
//       component = fixture.componentInstance;
//       fixture.detectChanges();
//     });

//     it('should create', () => {
//       expect(component).toBeTruthy();
//     });
    // .then(() => {
    //   fixture = TestBed.createComponent(GenerarEntrevistaComponent);
    //   component = TestBed.createComponent(GenerarEntrevistaComponent).componentInstance;
    //   service = TestBed.get(ExamenesService);
    //    console.log(service.GetExamenes(10));
    //  });
  // }));


  // it('should create', async(inject([ExamenesService, SettingsService], (examenesService, settingsService) => {
  //   component = new GenerarEntrevistaComponent(examenesService, settingsService);
  //   expect(component).toBeTruthy();
  // })));

  // it('should get the mock data', () => {
  //   fixture.detectChanges();  // this line will call components ngOnInit() method
  //   expect(component.cuestionario.length > 0).toBeTruthy();
  //  });

// });
