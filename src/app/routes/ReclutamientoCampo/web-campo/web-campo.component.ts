import { ReclutamientoCampoService } from './../../../service/ReclutamientoCampo/reclutamiento-campo.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { filter } from 'rxjs-compat/operator/filter';

@Component({
  selector: 'app-web-campo',
  templateUrl: './web-campo.component.html',
  styleUrls: ['./web-campo.component.scss']
})
export class WebCampoComponent implements OnInit {
  public disabled = false;
  public compact = false;
  public shown = 'shown';

  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  reclutadores = [];
  search = '';
  rows = [];
  unidadesnegocios = [];
  unId = 0;

  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover mb-0 ']
  };
  dataSource: any;
  totalReclutadores: number;

  constructor(private _service: ReclutamientoCampoService,
    private _Router: Router) { }

  ngOnInit() {
    this.GetDtosReclutadores();
    this.GetUnidadesNegocios();
  }

  GetUnidadesNegocios() {
    this._service.GetUnidadesNegocio().subscribe(result => {
      this.unidadesnegocios = result;
    });
  }
  GetDtosReclutadoresByUnidad() {
    if (this.unId === 0) {
      this.GetDtosReclutadores();
    } else {
      this._service.GetReclutadoresByUnidad(this.unId).subscribe(result => {
        // const aux = [];
        // result.forEach(element => {
        //   element.reclutadores.forEach(e => {
        //     aux.push({
        //       oficinaId: element.oficinaId,
        //       oficina: element.oficina,
        //       reclutadorId: e.reclutadorId,
        //       nombre: e.nombre,
        //       requis: e.requis
        //     });
        //   });
        // });
        this.dataSource = result;
        this.totalReclutadores = 0;
        this.dataSource.forEach(r => {
          this.totalReclutadores += r.reclutadores.length;
        });
        this.onChangeTable(null);
      });
    }
  }
  GetDtosReclutadores() {
    this._service.GetDtosReclutadores().subscribe(result => {
      this.dataSource = result;
      this.totalReclutadores = 0;
      this.dataSource.forEach(r => {
        this.totalReclutadores += r.reclutadores.length;
      });
       this.onChangeTable(null);
    });
  }

  public Search(data: any, $event): any {
    // this.search = $event.target.value;
    let filteredData: Array<any> = data;
    if ($event != null) {
      let tempArray: Array<any> = [];

      const colFiltar: Array<any> = [{ title: 'nombre' }];
    filteredData = filteredData.filter(element => {
      element.reclutadores.filter(item => {
      let flag = false;
      colFiltar.forEach(function (c) {
        if (item[c.title].toString().toLowerCase().match($event.target.value.toLowerCase())) {
          flag = true;
        }
      });

      if (flag) {
        tempArray.push(item);
      }
    });

    element.reclutadores = tempArray;
    tempArray = [];
     return element;
  });
}
  return filteredData;
  }

  public onChangeTable($event): any {

    let filteredData = JSON.parse(JSON.stringify(this.dataSource));
    filteredData = this.Search(filteredData, $event);
    this.rows = filteredData;
    // this.rows = page && config.paging ? this.changePage(page, this.rows) : this.rows;
    // this.length = this.reclutadores.length;
  }
  GoVacantes(row) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'reclutador': row.nombre,
        'reclutadorId': row.reclutadorId
      },
      skipLocationChange: true
    };
    this._Router.navigate(['/webcampo/reclutadorvacantes'], navigationExtras);
  }

  //   scroll(id) {
  //     const el = document.getElementById('tblRequis' + id);
  //     el.scrollIntoView();
  // }

}
