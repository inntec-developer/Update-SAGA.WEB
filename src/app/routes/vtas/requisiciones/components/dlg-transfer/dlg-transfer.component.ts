import { RequisicionesService } from './../../../../../service/requisiciones/requisiciones.service';
import { AdminServiceService } from './../../../../../service/AdminServicios/admin-service.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ComentariosService } from '../../../../../service/Comentarios/comentarios.service';
import { SettingsService } from '../../../../../core/settings/settings.service';
import { NgxSpinnerService } from 'ngx-spinner';
const swal = require('sweetalert');
@Component({
  selector: 'app-dlg-transfer',
  templateUrl: './dlg-transfer.component.html',
  styleUrls: ['./dlg-transfer.component.scss'], 
  providers: [AdminServiceService, ComentariosService, RequisicionesService]
})
export class DlgTransferComponent implements OnInit {

  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown = 'hover';

  coord = [];
  asig = [];
  asig2 = [];
  listaAsignar = [];
  listaAsignar2 = [];

  rowAux;
  coordId;
  coordNom = "";
  titulo = "";
  usuario = 0;
  verRecl: boolean = false;
  loading: boolean = false;
  public comentario: string = "";
  dataRowIndex: any;
  dataRowIndex2: any;
  rowAux2: any;
  
  constructor(
    private _sevice: AdminServiceService, 
    private _requiService: RequisicionesService,
    private dialog : MatDialogRef<DlgTransferComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private serviceComentarios: ComentariosService, 
    private settings: SettingsService) 
    {
      dialog.disableClose = true;
    }

  ngOnInit() {
   this.GetCoordinadores();
  }
  setLista2()
  {
   this._requiService.GetAsignados(this.data.id).subscribe(result => {
        this.listaAsignar2 = result;
     
      });
  }

  GetReclutadores($event)
  {
    if($event.checked)
    {     
      this._requiService.GetAsignados(this.data.id).subscribe(result => {
        this.listaAsignar = result;
        this.listaAsignar2 = Object.assign([], this.listaAsignar);
        this.verRecl = true;
      this.usuario = this.data.usuario;
      this.data.usuario = 11;
      this.titulo = "Reclutador";
        // this.setLista2();
      });
    }
    else
    {
      this.verRecl = false;
      this.data.usuario = this.usuario;
      this.asig = [];
      this.GetCoordinadores();
    }
  }
  GetCoordinadores()
  {
    this._sevice.GetByUsuario(this.data.usuario).subscribe(data => {
      this.coord = data;
      if(this.data.usuario == 4)
      {
        this.titulo = "Coordinador";
      }
      else if(this.data.usuario == 11)
      {
        this.titulo = "Reclutador";
      }
      else
      {
        this.titulo = "Ejecutivo";
      }
    });
  }

  onSelect(item: any, rowIndex) 
  {
      var entidad = this.listaAsignar2.findIndex(x => x.reclutadorId == item.reclutadorId);
      
      if(entidad >= 0) //para que no repita usuarios
      {
         this.listaAsignar2.splice(entidad, 1);
       
      }

      if(this.rowAux)
      {
        this.listaAsignar2.push(this.rowAux);
        this.asig.pop();
        this.rowAux.selected = false;
        
        this.dataRowIndex = rowIndex;
        this.rowAux = item;
        item.selected = true;
        this.asig.push(item)
      }
      else
      {
        this.rowAux = item;
        this.dataRowIndex = rowIndex;
        item.selected = true; //para poner el backgroun cuando seleccione
        this.asig.push(item)
      }
  }
  onSelect2(item: any, rowIndex) 
  {
    var entidad = this.listaAsignar.findIndex(x => x.reclutadorId == item.reclutadorId);
      
      if(entidad >= 0) //para que no repita usuarios
      {
         this.listaAsignar.splice(entidad, 1);
       
      }
      if(this.dataRowIndex2 != rowIndex)
      {
        if(this.rowAux2)
        {
          this.listaAsignar.push(this.rowAux2);
          this.asig2.pop();
          this.rowAux2.selected = false;
        }
        this.dataRowIndex2 = rowIndex;
        this.rowAux2 = item;
        item.selected = true;
        this.asig2.push(item)
      }
      else
      {
        this.rowAux2 = item;
        this.dataRowIndex2 = rowIndex;
        item.selected = true; //para poner el backgroun cuando seleccione
        this.asig2.push(item)
      }
  }

  Seleccionar(row, rowIndex)
  {
    if(this.dataRowIndex != rowIndex)
    {
      if(this.rowAux)
      {
        this.rowAux.selected = false;
      }
      this.dataRowIndex = rowIndex;
      this.rowAux = row;
      row.selected = true;
    }
    else
    {
      this.rowAux = row;
      this.dataRowIndex = rowIndex;
      row.selected = true; //para poner el backgroun cuando seleccione
    }

    this.coordId = row.id;
    this.coordNom = row.nombre;
  }

  AddComentario()
  {
    if(this.coordNom.length > 0 || this.asig.length > 0)
    {
  
      let tipo = 1; //cambio coordinador
      let usuarioAux = this.settings.user['id'];
      if(this.data.usuario == 10)
      {
        tipo = 2 //cambio ejecutivo
      }
      else if(this.data.usuario == 11)
      { 
        tipo = 3 //cambio reclutador
        this.coordId = this.asig2[0].reclutadorId;
        usuarioAux = this.asig[0].reclutadorId;
      }
    let Comentario = {
        Comentario: this.comentario,
        RequisicionId: this.data.id,
        MotivoId: 7,
        UsuarioAlta: this.settings.user['nombre'],
        ReclutadorId: this.settings.user['id'],
        EstatusId: 20,
        UsuarioTransferId: this.coordId,
        UsuarioAux: usuarioAux,
        Tipo: tipo
      }
      swal({
        title: "¿ESTÁS SEGURO?",
        text: "¡Se asignara la vacante con folio " + this.data.folio + " a coordinador " + this.coordNom + "!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ec2121",
        confirmButtonText: "Aceptar",
        cancelButtonColor: "#ec2121",
        cancelButtonText: "Cancelar",
        closeOnConfirm: true,
        closeOnCancel: true
      }, (isConfirm) => {

        // window.onkeydown = null;
        // window.onfocus = null;
        if (isConfirm) {
          this.loading = true;
        
          this.serviceComentarios.addComentarioVacante(Comentario).subscribe(data => {
            if (data == 200) {
              this.comentario = '';
              this.rowAux.selected = false;
              this.loading = false;

              swal("TRANSFERIR", '¡La asignación se realizó con éxito!', 'success' );
              this.dialog.close(true);
            
            }
            else
            {
              this.loading = false;

              swal('ERROR', 'Ocurrio un error', 'error');
            }
          });
  
        }
        else {
          swal("Cancelado", "No se realizó ningún cambio", "error");
        }
      });
     
    }
    else
    {
      swal('ERROR', 'Debe seleccionar ejecutivo', 'error')
    }
  }

}
