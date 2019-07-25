import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneda'
})
export class MonedaPipe implements PipeTransform {

  transform(value: any, args?: any, args2?: any): any {
    args = args || '';
    args2 = args2 || '';
    var valor = '';
    var cdu = '';
    var cmdmum ='';
    var data = String(value);
    var obj = data.split('.',-1);
    if(obj.length == 1){
      obj.push('00');
    }
    if(obj[0].length <= 3){
      valor = value;
    }
    else if(obj[0].length > 3 && obj[0].length < 7 ){
      cdu = obj[0];
      cmdmum = obj[0];
      cdu = cdu.slice(-3);
      cmdmum = cmdmum.slice(0,-3);
      valor = cmdmum+','+cdu+'.'+obj[1];
    }else if(obj[0].length > 6 ){
      cdu = obj[0];
      cmdmum = obj[0];
      var m= obj[0];
      cdu = cdu.slice(-3);
      cmdmum = cmdmum.slice(-6,-3);
      m = m.slice(0,-6);
      valor = m+','+cmdmum+','+cdu+'.'+obj[1];
    }
    var nom = ' '+args2;
    return args+valor+nom;
  }

}
