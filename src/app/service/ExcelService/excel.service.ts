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

  public exportAsExcelFile(json: any[], excelFileName: string, excelSheetName: string): void {
    debugger;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    var wscols = [
      {wch: 40},
      {wch: 40}, // "characters"
      {wch: 40}, // "characters"
      {wch: 40}, // "characters"
      {wch: 40}, // "characters"
      {wch: 40}, // "characters"
      {wch: 40}, // "characters"
      {wch: 40}, // "characters"
      {wch: 40}, // "characters"
      {wch: 40}, // "characters"
      {wch: 40} // "characters"      

    ];

  worksheet['!cols'] = wscols;
  //  console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { excelSheetName: worksheet }, SheetNames: [excelSheetName] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

//     var range_string = "A1:O1";
// var range = XLSX.utils.decode_range(range_string);

// for(var C = range.s.c; C <= range.e.c; ++C) {
//   var addr = {r:0, c:C}; // row and col are 0-indexed, so r:0 is Row 1 
//   var addr_str = XLSX.utils.encode_cell(addr);
//   var cell = worksheet[addr_str];
//   // do something with cell here
//   worksheet[cell].z = '#.0';
// }

// var C = XLSX.utils.decode_col("A"); // 1
// var fmt = "0"; // or '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)' or any Excel number format

// /* get worksheet range */
// var range = XLSX.utils.decode_range(worksheet['!ref']);

// for(var i = range.s.r + 1; i <= range.e.r; i++) {
//   /* find the data cell (range.s.r + 1 skips the header row of the worksheet) */
//   var ref = XLSX.utils.encode_cell({r:i, c:C});
//   // /* if the particular row did not contain data for the column, the cell will not be generated */
//   // if(!worksheet[ref]) continue;
//   // /* `.t == "n"` for number cells */
//   // if(worksheet[ref].t != 'n') continue;
//   // /* assign the `.z` number format */
//   worksheet[ref].t = 'n';
//   worksheet[ref].z = fmt;
// }

    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });

    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  
}
