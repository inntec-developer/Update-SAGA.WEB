import { Component, OnInit } from '@angular/core';
import { ExamenesService } from '../../../service/Examenes/examenes.service';
import {FormControl, Validators} from '@angular/forms';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';
@Component({
  selector: 'app-agregar-resultados-psico',
  templateUrl: './agregar-resultados-psico.component.html',
  styleUrls: ['./agregar-resultados-psico.component.scss']
})
export class AgregarResultadosPsicoComponent implements OnInit {

  constructor(private _serviceExamen: ExamenesService, private toasterService: ToasterService) { }

  candidatos = [];
  catalogo = ['APTO', 'NO APTO'];
  filteredData = [];
  se = new FormControl('', [Validators.required]);

  ngOnInit() {
    this.GetClavesCandidatos();
  }

  GetClavesCandidatos()
  {
    this._serviceExamen.GetClavesCandidatos().subscribe(data => {
      this.candidatos = data;
      this.filteredData = data;
    })
  }

  AgregarResultado(row, c)
  {
    var resultado = {RequiClaveId: row.requiClaveId, Resultado: c, UsuarioId: sessionStorage.getItem('id')};
    this._serviceExamen.AgregarResultadoPsico(resultado).subscribe(data => {
      if(data == 200)
      {
        this.popToast('success', 'Agregar Resultados', 'Los cambios se realizaron con éxito');
        this.se.setValue('');
        this.GetClavesCandidatos();

      }
      else
      {
        this.popToast('error', 'Agregar Resultados', 'Ocurrio un error al intentar agregar resultado');
      
      }
    })
  }

  public Search(data: any) {
    let tempArray: Array<any> = [];
    let colFiltar: Array<any> = [{ title: "clave" }];

    this.filteredData.forEach(function (item) {
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

    this.candidatos = tempArray;
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
