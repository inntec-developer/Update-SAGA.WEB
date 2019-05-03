import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { ExamenesService } from './../../../service/Examenes/examenes.service';
import { RequisicionesService } from './../../../service/requisiciones/requisiciones.service';

@Component({
  selector: 'app-asignar-examen',
  templateUrl: './asignar-examen.component.html',
  styleUrls: ['./asignar-examen.component.scss']
})
export class AsignarExamenComponent implements OnInit {

  se = new FormControl('', [Validators.required]);
  ste = new FormControl('', [Validators.required]);
  nom: any;
  tipoId:any;
  catalogo = [];
  examenes = [];
  examen = [];
  examenRequi = [];
  requiselect = [];
  requisiciones = [];
  examenId = 0;
  verExamen = false;
  filterData = [];

  public columns: Array<any> = [
    { title: 'Folio', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'Solicita', className: 'text-center', name: 'solicita', filtering: { filterString: '', placeholder: 'Solicita' } },
    { title: 'Cliente', className: 'text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'Cliente' } },
    { title: 'Perfil', className: 'text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Perfil' } },
    { title: 'Creación', className: 'text-center', name: 'fch_Creacion', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
  ];

  constructor(private service: ExamenesService, private toasterService: ToasterService, private requiservicio: RequisicionesService) { }

  public config: any = {
    paging: true,
    //sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-hover mb-0 ']
  };


  ngOnInit() {
    this.GetCatalogoExamenes();
    this.GetRequisiciones();
  }

  GetCatalogoExamenes()
  {
    this.service.GetCatalogo().subscribe(data =>{
      this.catalogo = data;
    })
  }

  GetExamenes(tipoexamenId)
  {
    this.service.GetExamenes(tipoexamenId).subscribe(data => {
      this.examenes = data;
    })
  }

  GetExamen(ExamenId)
  {
    this.service.GetExamen(ExamenId).subscribe(data => {
      this.examen = data;
    })
  }

  GetRequisiciones()
  {
    this.service.GetRequisicionesEstatus(4).subscribe(data => {
      this.requisiciones = data;
      this.filterData = data;
    })
  }

  GetExamenRequi(requisicionId)
  {
    this.service.GetExamenRequi(requisicionId).subscribe(data => {
      this.examenRequi = data;
      this.verExamen = true;
    })
  }

  AgregarRelacion()
  {
    if(this.requiselect.length > 0)
    {
      var relacion = [];
      this.requiselect.forEach(element => {
         relacion.push( {RequisicionId: element.id, ExamenId: this.examenId});
      });

      this.service.InsertRelacion(relacion).subscribe(data => {
        if(data == 200)
        {
          this.popToast('success', 'Asignar Examen', 'La relacion requisición examen se genero con éxito');
          this.requiselect = [];
          this.GetRequisiciones();
          this.se.setValue(0);
          this.ste.setValue(0);
          this.examen = [];
          this.examenes = [];
        }
        else
        {
          this.popToast('error', 'Asignar Examen', 'Ocurrio un error');
        }
      })
    }

  }

  closeModal()
  {
    this.verExamen = false;
  }
  onSelect(row)
  {
    if(row.examen)
    {
      row.selected = false;
    }
    else
    {
      row.selected ? row.selected = false : row.selected = true;

      if(row.selected)
      {
        this.requiselect.push(row);
      }
      else
      {
        this.requiselect = this.requiselect.filter(function(item)
        {
          if(item.folio !== row.folio)
          {
            return item;
          }
        });
      }
    }

  }
  public Search(data: any) {
    let tempArray: Array<any> = [];
    let colFiltar: Array<any> = [{ title: "folio" }, {title: "vBtra"}];

    this.filterData.forEach(function (item) {
      let flag = false;
      colFiltar.forEach(function (c) {
        if (item[c.title].toString().toLowerCase().match(data.target.value.toLowerCase())) {
          flag = true;
        }
      });

      if (flag) {
        tempArray.push(item)
      }
    });

    this.requisiciones = tempArray;
  }


   /**
  * configuracion para mensajes de acciones.
  */
 toaster: any;
 toasterConfig: any;
 toasterconfig: ToasterConfig = new ToasterConfig({
   positionClass: 'toast-bottom-right',
   limit: 7,
   tapToDismiss: false,
   showCloseButton: true,
   mouseoverTimerStop: true,
   preventDuplicates: true,
 });

 popToast(type, title, body) {
   var toast: Toast = {
     type: type,
     title: title,
     timeout: 4000,
     body: body
   }
   this.toasterService.pop(toast);

 }
}
