import { MatPaginatorIntl } from '@angular/material/paginator';
import {PaginationConfig} from 'ngx-bootstrap/pagination';

const dutchRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 van ${length}`; }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} de ${length}`;
}


export function getSpanishPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Filas:';
  paginatorIntl.nextPageLabel = 'Página siguiente';
  paginatorIntl.previousPageLabel = 'Página anterior';
  paginatorIntl.firstPageLabel = 'Primera página';
  paginatorIntl.lastPageLabel = 'Ultima página';
  paginatorIntl.getRangeLabel = dutchRangeLabel;

  return paginatorIntl;
}

export function getSpanishPaginatorBtp(){
  const paginator = new PaginationConfig

  paginator.main.firstText = 'Inicio';
  paginator.main.previousText = '&lsaquo;&lsaquo;';
  // '&lsaquo;' ---   < 
  paginator.main.nextText ='&rsaquo;&rsaquo;';
  paginator.main.lastText = 'Final';
  return paginator;
}
 