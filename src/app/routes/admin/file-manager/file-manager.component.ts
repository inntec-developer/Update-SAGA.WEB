import { FileSaver } from 'file-saver';

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
  files = [];
  image = [];
  nomImg = "";
  constructor(private service: AdminServiceService) { }

  ngOnInit() {
    this.GetFiles();
  }

  fileChangeListener($event) 
  {
    let file: File = $event.target.files[0];
    console.log(file)
  }

  verArchivo(datos)
  {
    this.service.GetImage(datos.nom).subscribe( res => {
      this.image = res;
      this.nomImg = datos.nom;
      this.modal.show();
    });
    
  }

  downloadFile(datos)
  {
    this.service.GetImage(datos.nom).subscribe( res => {
      console.log(datos)
      FileSaver.saveAs(res, datos.nom)
    });

  }

  // downloadFile(data: Response){
  //   var blob = new Blob([data], { type: 'application/pdf' });
  //   var url= window.URL.createObjectURL(blob);
  //   window.open(url);
  // }

  closeModal()
  {
    this.modal.hide();
  }

  getTypes(data)
  {
    data.forEach(element => {
      if(element.ext == '.jpeg' || element.ext == '.jpg')
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
      
    });
    console.log(this.files)
  }

  GetFiles()
  {
    this.service.GetFiles()
    .subscribe( data => {
      console.log(data)
      this.getTypes(data)
    });
    
  }
}
