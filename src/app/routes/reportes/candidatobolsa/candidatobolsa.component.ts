import { ColorsService } from './../../../shared/colors/colors.service';
import { Component, OnInit, Input } from '@angular/core';
import { ReportesService } from '../../../service/Reporte/reportes.service';
import { ExcelService } from '../../../service/ExcelService/excel.service';


@Component({
  selector: 'app-candidatobolsa',
  templateUrl: './candidatobolsa.component.html',
  styleUrls: ['./candidatobolsa.component.scss']
})
export class CandidatobolsaComponent implements OnInit {
  @Input('edad') edad;
  @Input('genero') genero;
  public General: any[];
  public palabra: string;


  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown = 'hover';

    // spinner-material
    color = 'primary';
    mode = 'indeterminate';
    value = 60;
  public rows: Array<any> = [];

  requisiciones = [];

  // Varaibles del paginador
  public page = 1;
  public itemsPerPage = 50;
  public maxSize = 5;
  public numPages = 1;
  public length = 50;

  registros = 0;
  showFilterRow: boolean;

  public config: any = {
    paging: false,
    filtering: { filterString: '' },
    className: ['table-hover  mb-0']
  };
  rowIndex = [1, 50];
  spinner: boolean;
  source: any = [];
  columns = [
    { title: 'Fecha Registro', className: 'text-info text-center', name: 'fecha',
    filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'CURP', className: 'text-success text-center', name: 'curp', filtering: { filterString: '', placeholder: 'curp' } },
    { title: 'NOMBRE', className: 'text-info text-center', name: 'nombre', filtering: { filterString: '', placeholder: 'nombre' } },
    { title: 'ESTADO', className: 'text-info text-center', name: 'estado', filtering: { filterString: '', placeholder: 'estado' } },
    { title: 'EDAD', className: 'text-info text-center', name: 'edad', filtering: { filterString: '', placeholder: 'edad' } },
    { title: 'GENERO', className: 'text-info text-center', name: 'genero', filtering: { filterString: '', placeholder: 'Genero' } },
    { title: 'ESTATUS', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'estatus' } },
    { title: '% PERFIL', className: 'text-info text-center', name: 'avance', filtering: { filterString: '', placeholder: '% Perfil' } },
  ];
  totales: any = [];

  pieOptions = {
      animate: {
          duration: 800,
          enabled: true
      },
      barColor: this.colors.byName('info'),
      trackColor: 'rgba(200,200,200,0.4)',
      scaleColor: false,
      lineWidth: 5,
      lineCap: 'round',
      size: 40
  };
  constructor(
    private servicio: ReportesService,
    private Exel: ExcelService,
    public colors: ColorsService
  ) { }

  ngOnInit() {
  }

  Exportar() {
    const obj = [];
this.spinner = true;
this.source.rowIndex = [0, this.requisiciones[0].total + 1];

this.servicio.getCandidatos(this.source)
      .subscribe(data => {
        data.candidatos.forEach(item => {
          obj.push({
            'NOMBRE': item.nombre,
            'ESTADO': item.estado,
            'EDAD': item.edad,
            'GENERO': item.genero,
            'ESTATUS': item.estatus,
            'CURP': item.curp,
            'RFC': item.rfc,
          });
        });
        this.Exel.exportAsExcelFile(obj, 'Reporte');
        this.spinner = false;
      });

  }

  Generar(estado, estatus) {
    this.spinner = true;
    this.rowIndex = [0, 50];
    // let pal = document.getElementById('palabra');
    const inc = document.getElementById('fechaInicial');
    const fin = document.getElementById('fechaFinal');

    const inicio = inc['value'];
    const final = fin['value'];
    const edadC = this.edad.toString();
    const generoC = this.genero.toString();


    this.source = {
      rowIndex: this.rowIndex,
      fini: inicio,
      ffin: final,
      stus: estatus,
      estadoId: estado,
      edad: edadC,
      genero: generoC
    };

    this.servicio.getCandidatos(this.source)
      .subscribe(data => {
        this.requisiciones = data.candidatos;
        this.totales = data.totales;
        this.General = data.candidatos;
        this.onChangeTable(this.config);
this.spinner = false;
      });
  }

  LimpiaFiltro(valor) {
    if (valor = 0) {
      this.columns = [];
    } else {
      
    }
  }

  public changePage(page: any, data: Array<any> = this.requisiciones) {
    this.spinner = true;
    const start = (page.page - 1) * page.itemsPerPage > 0 ? (page.page - 1) * page.itemsPerPage : 0;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : 50;

    this.source.rowIndex = [start, end - 1];
    this.servicio.getCandidatos(this.source).subscribe(result => {
      if (result !== 404) {
        if (result.candidatos.length > 0) {
          this.requisiciones = result.candidatos;
          this.totales = result.totales;
          this.rows = this.requisiciones;
          this.spinner = false;
        }
      }
    });

  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering.filterString !== '') {
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] != null) {
            return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
          }
        });
      }
    });

    return filteredData;
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }
    if (config.paging) {
      this.columns.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name)).value = '';
      });
      this.changePage(page, this.rows);
    }
    this.rows = this.requisiciones;
    this.rows = this.changeFilter(this.rows, this.config);
    this.length = this.totales.total;
  }


  public refreshTable(estado, estatus) {
    this.config.paging = true;
    this.Generar(estado, estatus);
  }

  public clearfilters() {
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.config.paging = false;
    this.onChangeTable(this.config);

  }

}
