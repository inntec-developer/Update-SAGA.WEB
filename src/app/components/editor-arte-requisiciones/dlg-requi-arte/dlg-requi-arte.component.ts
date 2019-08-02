import { Component, OnInit } from '@angular/core';
import { SistTicketsService } from '../../../service/SistTickets/sist-tickets.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dlg-requi-arte',
  templateUrl: './dlg-requi-arte.component.html',
  styleUrls: ['./dlg-requi-arte.component.scss']
})
export class DlgRequiArteComponent implements OnInit {

  public disabled = false;
  public compact = false;
  public invertX = true;
  public invertY = true;
  public shown = 'hover';
  
  requisiciones = [];
  filterData: any[] = [];
  constructor(private _service: SistTicketsService, private dialog : MatDialogRef<DlgRequiArteComponent>) { }

  ngOnInit() {
    this.GetRequisiciones();
  }

  GetRequisiciones()
  {
    this._service.GetVacantes().subscribe(data => {
      this.requisiciones = data;
      this.filterData = data;
    })
  }

  onSelect(row)
  {
    this.dialog.close(row)
  }
  public Search(data: any) {

    let search = data.target.value;
    let tempArray: Array<any> = [];

    let colFiltar: Array<any> = [{ title: "folio"}, {title: "vBtra" }];

    this.requisiciones.forEach(function (item) {
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

    this.filterData = tempArray;

  }
}
