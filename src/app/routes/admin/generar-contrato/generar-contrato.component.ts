import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../../service/AdminServicios/admin-service.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

// import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';

@Component({
  selector: 'app-generar-contrato',
  templateUrl: './generar-contrato.component.html',
  styleUrls: ['./generar-contrato.component.scss']
})
export class GenerarContratoComponent implements OnInit {

  spinner = false;
  candidatos = [];
  rows = [];
  content: any = '<p>Hello, world!</p>';
   public Editor = DecoupledEditor;

  // scroll
  public disabled = false;
  public invertX = false;
  public compact = false;
  public invertY = false;
  public shown = 'shown';
  constructor(private service: AdminServiceService) { 
  
  }
  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
}
  ngOnInit() {
    this.GetDtosCandidatos();
    // this.Editor
    // .create( document.querySelector( '#editor' ) )
    // .then( editor => {
    //     const toolbarContainer = document.querySelector( '#toolbar-container' );

    //     toolbarContainer.appendChild( editor.ui.view.toolbar.element );
    // } )
    // .catch( error => {
    //     console.error( error );
    // } );
    DecoupledEditor
    .create( document.querySelector( '.document-editor__editable' ), {
        cloudServices: {
        }
    } )
    .then( editor => {
        const toolbarContainer = document.querySelector( '.document-editor__toolbar' );

        toolbarContainer.appendChild( editor.ui.view.toolbar.element );
    } )
    .catch( err => {
        console.error( err );
    } );
  }
  GetDtosCandidatos() {
    this.spinner = true;
    this.service.GetDatosGafetes().subscribe(data => {
      this.candidatos = data;
      this.Search('');
      this.spinner = false;
    });
  }
  errorImg(r) {
    r['foto'] = '/assets/img/user/default-user.png';
  }
  public Search(search: string) {
    if (search === '') {
      this.rows = JSON.parse(JSON.stringify(this.candidatos));
      return;
    }

    const tempArray: Array<any> = [];
    const colFiltar: Array<any> = [{ title: 'nom' }, { title: 'apellidoPaterno' }, { title: 'apellidoMaterno' }];

    this.candidatos.forEach(function (item) {
      let flag = false;
      colFiltar.forEach(function (c) {
        if (item[c.title].toString().toLowerCase().match(search.toLowerCase())) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    this.rows = tempArray;
  }
  onChange(event) {
   const file = event.target.files[0];
   const reader = new FileReader();

    const self = this;
    reader.readAsBinaryString(file);
     reader.onload = function(e) {
      const zip = new PizZip(reader.result);
      const doc = new Docxtemplater();
      doc.loadZip(zip);
      const text = doc.getFullText();
     

      self.getFile(text);

    };


  }

  getFile(file: any) {
    this.content = file;

    // document.querySelector('.document-editor__editable').innerHTML = file + '</p>';
  }

}
