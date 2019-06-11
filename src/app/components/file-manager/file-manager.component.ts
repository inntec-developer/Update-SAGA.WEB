import { saveAs } from 'file-saver';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AdminServiceService } from '../../service/AdminServicios/admin-service.service';
const swal = require('sweetalert');

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
  providers:[ AdminServiceService ]
})
export class FileManagerComponent implements OnInit {

  @Input() public accept: Array<string> = [];
  @Input() public candidatoId: any;

  @ViewChild('staticModal') modal;
  //config scroll
  disabled = false;
  compact = false;
  invertX = true;
  invertY = true;
  shown = 'hover';
  
  selectedFile: File;
  cont_image = 0;
  cont_pdf = 0;
  cont_xls = 0;
  cont_word = 0;
  files = [];
  image;
  nomImg = "";
  pdfSrc;
  imgShow = false;
  pdfShow = false;
  verMsj = false;
  
  alerts: any[] = [
    {
      type: 'success',
      msg: '',
      timeout: 4000
    },
    {
      type: 'danger',
      msg: '',
      timeout: 4000
    }
  ];
alert = this.alerts;
onClosed(): void {
  this.verMsj = false;
}

  constructor(private service: AdminServiceService) { }

  ngOnInit() {
    this.files = [];
    this.cont_image = 0;
    this.cont_pdf = 0;
    this.cont_word = 0;
    this.cont_xls = 0;
    this.GetFiles();
  }

  fileChangeListener($event) 
  {
    let file: File = $event.target.files[0];

    this.service.UploadFile(file, this.candidatoId).subscribe(result => {
      if(result === 201)
      {
        this.ngOnInit();
        this.alerts[0]['msg'] = "El archivo " + file.name + " se subió con éxito";
        this.alert = this.alerts[0];
        this.verMsj = true;
      }
      else
      {
        this.alerts[1]['msg'] = "Ocurrió un error al intentar subir archivo " + file.name;
        this.alert = this.alerts[1];
        this.verMsj = true;
      }
    });

  }

  verArchivo(datos)
  {
    if(datos.type.toLowerCase() === '.jpeg' || datos.type.toLowerCase() === '.jpg' || datos.type.toLowerCase() === '.png')
    {
      
        this.imgShow = true;
        this.pdfShow = false;
        this.image = this.service.GetImage( '/' + this.candidatoId + datos.nom);
        this.nomImg = datos.nom;
        this.modal.show();
  
    }
    else
    {
        this.imgShow = false;
        this.pdfShow = true;
        this.pdfSrc = this.service.GetPdf('utilerias/Files/users/' + this.candidatoId + '/' + datos.nom).subscribe( data=>{
        var fileurl = window.URL.createObjectURL(data);
        window.open(fileurl)
          // this.pdfSrc = fileurl;
          // this.modal.show();
        })
          
    }
  }


  downloadFile(datos)
  {
    var ruta = '/utilerias/Files/users/' + this.candidatoId + '/';

    this.service.DownloadFiles(ruta + datos.nom).subscribe( res =>{
      saveAs(res, datos.nom)
    })
  
  }

  deleteFile(datos)
  {
    swal({
      title: "¿ESTÁS SEGURO?",
      text: "¡Se borrara el archivo " + datos.nom + "!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ec2121",
      confirmButtonText: "¡Si, borrar!",
      cancelButtonColor: "#ec2121",
      cancelButtonText: "¡No, cancelar!",
      closeOnConfirm: true,
      closeOnCancel: true
    }, (isConfirm) => {
      window.onkeydown = null;
      window.onfocus = null;
      if (isConfirm) {
        var ruta = '/utilerias/Files/users/' + this.candidatoId + '/';
        this.service.DeleteFiles(ruta + datos.nom).subscribe( res =>{
          if(res == 200)
          { 
            swal('Borrar Archivo', 'El archivo se borró con éxito', 'success')
            this.ngOnInit();
          }
          else
          {
            swal('Borrar Archivo', 'Ocurrio un error al intentar borrar archivo', 'error')
          }
        });
      }
      else
      {
        swal("Cancelado", "No se realizó ningún cambio", "error");
      }
});
  
  }

  closeModal()
  {
    this.modal.hide();
  }

  getTypes(data)
  {
    data.forEach(element => {
      if(element.ext.toLowerCase() == '.jpeg' || element.ext.toLowerCase() == '.jpg' || element.ext.toLowerCase() == '.png')
      {
        this.files.push({
          type: element.ext, 
          nom: element.nom, 
          size: element.size,
          fc: element.fc,
          icon: 'fa-file-image-o'});
        this.cont_image ++;
      }
      else if(element.ext == '.pdf')
      {
        this.files.push({
          type: element.ext,
          nom: element.nom,
          size: element.size,
          fc: element.fc,
          icon: 'fa-file-pdf-o'});
        this.cont_pdf++;
      }
      else if(element.ext == '.xlsx')
      {
        this.files.push({
          type: element.ext,
          nom: element.nom,
          size: element.size,
          fc: element.fc,
          icon: 'fa-file-excel-o'});
        this.cont_xls++;
      }
      else 
      {
        this.files.push({
          type: element.ext,
          nom: element.nom,
          size: element.size,
          fc: element.fc,
          icon: 'fa-file-word-o'});
        this.cont_word++;
      }
    });

  }

  GetFiles()
  {
    if(this.candidatoId)
    {
   
      this.service.GetFiles(this.candidatoId)
      .subscribe( data => {
        this.getTypes(data)
      });
  }
  }
}
