import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

//#region Variables de armando de tabla
  @Input() tableHeads: Array<String> = new Array<String>();
  @Input() tableDatas: Array<any> = new Array<any>();
  @Input() tableColName: Array<String> = new Array<String>();
  private tableColNameGenerated: Array<String> = new Array<String>();
  private isTableColNameSet: Boolean = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public Reg = false;
//#endregion

@Output() IdRegistro = new EventEmitter<number>();

  constructor() {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
  }

  //#region Armado de tabla.
  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableHeads']) {
      if (this.tableHeads === undefined) {
        this.Reg = false;
         return;
      }
    }

    if (changes['tableDatas']) {
      if (this.tableDatas.length > 0) {
        this.Reg = true;
        this.dataSource = new MatTableDataSource(this.tableDatas);
        this.dataSource.paginator = this.paginator;
      }
      if (!this.isTableColNameSet) {
        if (this.tableDatas.length > 0) {
          this.tableColNameGenerated = this.getKeys(this.tableDatas[0]);
          if (!this.isHeadAndColLengthSame(this.tableHeads, this.tableColNameGenerated)) {
            console.error('Table column row is not same as with property name in self generated');
         }
        }
      }
    }

    if (changes['tableColName']) {
      if (this.tableColName.length > 0) {
        this.tableColNameGenerated = this.tableColName;
        this.isTableColNameSet = true;
        if (!this.isHeadAndColLengthSame(this.tableHeads, this.tableColName)) {
          console.error('Table column row is not same as with property name provided');
        }
      }
    }
  }

  /**
  * This method will fetch all the property name and convert it into a list of String.
  * @param {Array<String>} head Pass in the list of String, which contains table header values
  * @param {Array<String>} col Pass in the list of String, which contains column property
  * name, which was received from Input or generated using this.getKeys()
  */
  private isHeadAndColLengthSame(head: Array<String>, col: Array<String>): Boolean {
    return (head.length === col.length);
  }

  /**
  * This method will fetch all the property name and convert it into a list of String.
  * @param {any} value Pass Instance of Object eg. new User()
  */
  private getKeys(value: any): Array<String> {
    return Object.keys(value);
  }
  //#endregion

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //#region Metodo de edición.
  selectEdit(IdReg: any) {
    this.IdRegistro.emit(IdReg);
  }
  //#endregion
}
