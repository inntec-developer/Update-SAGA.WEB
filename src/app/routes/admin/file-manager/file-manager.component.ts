import { saveAs } from 'file-saver';

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AdminServiceService } from '../../../service/AdminServicios/admin-service.service';



@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
  providers:[ AdminServiceService ]
})
export class FileManagerComponent implements OnInit {

  @Input() public accept: Array<string> = [];
  @ViewChild('staticModal') modal;

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

    this.service.UploadFile(file).subscribe(result => {
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
    if(datos.type === '.jpeg' || datos.type === '.jpg' || datos.type === '.png')
    {
      
        this.imgShow = true;
        this.pdfShow = false;
        this.image = this.service.GetImage(datos.nom);
        this.nomImg = datos.nom;
        this.modal.show();
  
    }
    else
    {
        this.imgShow = false;
        this.pdfShow = true;
        this.pdfSrc = this.service.GetPdf('utilerias/Files/users/83569bac-0d68-e811-80e1-9e274155325e/' + datos.nom).subscribe( data=>{
        var fileurl = window.URL.createObjectURL(data);
        window.open(fileurl)
          // this.pdfSrc = fileurl;
          // this.modal.show();
        })
          
    }
  }


  downloadFile(datos)
  {
    var ruta = '/utilerias/Files/users/83569bac-0d68-e811-80e1-9e274155325e/'

    this.service.DownloadFiles(ruta + datos.nom).subscribe( res =>{
      saveAs(res, datos.nom)
    })
  
  }

  closeModal()
  {
    this.modal.hide();
  }

  getTypes(data)
  {
    data.forEach(element => {
      if(element.ext == '.jpeg' || element.ext == '.jpg' || element.ext == '.png')
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
   
    this.service.GetFiles()
    .subscribe( data => {
       this.getTypes(data)
    });
    
  }
}
