import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../../service/AdminServicios/admin-service.service';
import { ApiConection } from '../../../service/api-conection.service';

@Component({
  selector: 'app-dlg-bgarte',
  templateUrl: './dlg-bgarte.component.html',
  styleUrls: ['./dlg-bgarte.component.scss'],
  providers:[ AdminServiceService ]
})
export class DlgBGArteComponent implements OnInit {
  //config scroll
  disabled = false;
  compact = false;
  invertX = true;
  invertY = true;
  shown = 'hover';

  cont_image = 0;
  files = [];

  constructor(private service: AdminServiceService) { }

  ngOnInit() {
    this.GetBackGround();
  }

  GetBackGround()
  {
    this.service.GetBGArte().subscribe( data => {
      this.getTypes(data)
    });
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
          icon: ApiConection.ServiceUrlFileManager + 'img/ArteRequi/BG/' + element.nom
        });
        this.cont_image ++;
      }
    });

  }



}
