import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../../service/AdminServicios/admin-service.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
  providers:[ AdminServiceService ]
})
export class FileManagerComponent implements OnInit {

  constructor(private service: AdminServiceService) { }

  ngOnInit() {
    this.GetFiles();
  }

  GetFiles()
  {
    this.service.GetFiles()
    .subscribe( data => {
      console.log(data)
    });
    
  }
}
