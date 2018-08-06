import * as _ from 'lodash';

import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { TableData } from './ng2-table-data';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-tabla-prueba',
  templateUrl: './tabla-prueba.component.html',
  styleUrls: ['./tabla-prueba.component.scss']
})
export class TablaPruebaComponent implements OnInit {

  public singleData;

  constructor(public http: HttpClient) {
      // ng2Table
      this.length = this.ng2TableData.length;
  }

  // ng2Table
  public rows: Array<any> = [];
  public columns: Array<any> = [
      { title: 'Name', name: 'name', filtering: { filterString: '', placeholder: 'Filter by name' } },
      {
          title: 'Position',
          name: 'position',
          sort: false,
          filtering: { filterString: '', placeholder: 'Filter by position' }
      },
      { title: 'Office', className: ['office-header', 'text-success'], name: 'office', sort: 'asc', filtering: { filterString: '', placeholder: 'Filter by officce' } },
      { title: 'Extn.', name: 'ext', sort: '', filtering: { filterString: '', placeholder: 'Filter by extn.' } },
      { title: 'Start date', className: 'text-warning', name: 'startDate', filtering: { filterString: '', placeholder: 'Filter by Date' } },
      { title: 'Salary ($)', name: 'salary' }
  ];
  public page: number = 1;
  public itemsPerPage: number = 20;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  public config: any = {
      paging: true,
      sorting: { columns: this.columns },
      filtering: { filterString: '' },
      className: ['table-striped', 'table-bordered', 'mb-0', 'd-table-fixed'],
    //   firstText: 'Inicio',
    //   previousText:'Anterior',
    //   nextText:'Siguiente',
    //   lastText: 'Ultimo'
  };

  public ng2TableData: Array<any> = TableData;

  public ngOnInit(): void {
      this.onChangeTable(this.config);
  }

  public changePage(page: any, data: Array<any> = this.ng2TableData): Array<any> {
      let start = (page.page - 1) * page.itemsPerPage;
      let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
      return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
      if (!config.sorting) {
          return data;
      }

      let columns = this.config.sorting.columns || [];
      let columnName: string = void 0;
      let sort: string = void 0;

      for (let i = 0; i < columns.length; i++) {
          if (columns[i].sort !== '' && columns[i].sort !== false) {
              columnName = columns[i].name;
              sort = columns[i].sort;
          }
      }

      if (!columnName) {
          return data;
      }

      // simple sorting
      return data.sort((previous: any, current: any) => {
          if (previous[columnName] > current[columnName]) {
              return sort === 'desc' ? -1 : 1;
          } else if (previous[columnName] < current[columnName]) {
              return sort === 'asc' ? -1 : 1;
          }
          return 0;
      });
  }

  public changeFilter(data: any, config: any): any {

      let filteredData: Array<any> = data;
      this.columns.forEach((column: any) => {
          if (column.filtering) {
              filteredData = filteredData.filter((item: any) => {
                  return item[column.name].match(column.filtering.filterString);
              });
          }
      });

      if (!config.filtering) {
          return filteredData;
      }

      if (config.filtering.columnName) {
          return filteredData.filter((item: any) =>
              item[config.filtering.columnName].match(this.config.filtering.filterString));
      }

      let tempArray: Array<any> = [];
      filteredData.forEach((item: any) => {
          let flag = false;
          this.columns.forEach((column: any) => {
              if (item[column.name].toString().match(this.config.filtering.filterString)) {
                  flag = true;
              }
          });
          if (flag) {
              tempArray.push(item);
          }
      });
      filteredData = tempArray;

      return filteredData;
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
      if (config.filtering) {
          (<any>Object).assign(this.config.filtering, config.filtering);
      }

      if (config.sorting) {
          (<any>Object).assign(this.config.sorting, config.sorting);
      }

      let filteredData = this.changeFilter(this.ng2TableData, this.config);
      let sortedData = this.changeSort(filteredData, this.config);
      this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
      this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
      
      let index = this.ng2TableData.indexOf(data.row);  
      console.log(data);

    /* add an class 'active' on click */
    $('#resultDataTable').on('click', 'tr', function (event: any) {
      //noinspection TypeScriptUnresolvedFunction
      $(this).addClass('active').siblings().removeClass('active');
    });
  }

}
