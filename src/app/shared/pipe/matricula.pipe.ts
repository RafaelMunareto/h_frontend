import { Pipe, PipeTransform } from '@angular/core';
import { environment as env } from 'src/environments/environment';
@Pipe({
  standalone: true,
  name: 'matricula',
})
export class MatriculaEmpregadoPipe implements PipeTransform {
  transform(value: string | number): string {
    let tam = value.toString().length;
    let resp = 'c000000';
    switch(tam){
      case 1: resp = 'c00000' +value.toString(); break;
      case 2: resp = 'c0000'  +value.toString(); break;
      case 3: resp = 'c000'   +value.toString(); break;
      case 4: resp = 'c00'    +value.toString(); break;
      case 5: resp = 'c0'     +value.toString(); break;
      case 6: resp = 'c'      +value.toString(); break;
      case 7: resp = ''       +value.toString().toLowerCase(); break;
    }
    // if (tam < 7)  resp = 'c' +String(value).padStart(6-tam,'0');
    // if (tam == 7) resp = ''  +String(value).toLowerCase();
    return resp;
  }
}
