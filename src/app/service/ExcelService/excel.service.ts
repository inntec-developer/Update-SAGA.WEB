import { style } from '@angular/animations';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})


export class ExcelService {

  constructor() { }

  public exportAsExcelFile(json: any, excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    let cols = Object.keys(json[0])
    var wscols = [];

    cols.forEach(element => {
      wscols.push({wch:50})
    });
   

    worksheet['!cols'] = wscols;
    // worksheet['A1'].l = { Target:"http://sheetjs.com", Tooltip:"Find us @ SheetJS.com!" };
    // worksheet['A1'].s = { patternType: 'solid',
    //                       fgColor: { theme: 8, tint: 0.3999755851924192, rgb: '2f80e7' },
    //                       bgColor: { indexed: 64 } }; 
    
    var workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "hoja1");
    
    //const workbook: XLSX.WorkBook = { Sheets: { 'hoja1': worksheet }, SheetNames: ['hoja1'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array'});
    this.saveAsExcelFile(excelBuffer, excelFileName);

  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });

    var f = new Date();
    var lon = f.getDate().toString().length;

    FileSaver.saveAs(data, fileName + '_' + f.getFullYear() + '' + (f.getMonth() + 1) + '' + '0'.repeat(2 - lon) + f.getDate() + EXCEL_EXTENSION);
  }
  
}
