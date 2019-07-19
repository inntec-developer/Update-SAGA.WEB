import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numerico'
})
export class NumericoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    debugger;
    args = args || '';
    var valor = '';
    var cdu = '';
    var cmdmum ='';
    var data = String(value);
    if(data.length <= 3){
      valor = value;
    }
    else if(data.length > 3 && data.length < 7 ){
      cdu = data;
      cmdmum = data;
      cdu = cdu.slice(-3);
      cmdmum = cmdmum.slice(0,-3);
      valor = cmdmum+','+cdu;
    }else if(data.length > 6 ){
      cdu = data;
      cmdmum = data;
      var m= data;
      cdu = cdu.slice(-3);
      cmdmum = cmdmum.slice(-6,-3);
      m = m.slice(0,-6);
      valor = m+','+cmdmum+','+cdu
    }
    return args+valor
  }

}
