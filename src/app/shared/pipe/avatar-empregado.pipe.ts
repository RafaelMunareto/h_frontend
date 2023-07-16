import { Pipe, PipeTransform } from '@angular/core';
import { environment as env } from 'src/environments/environment';
@Pipe({
  name: 'avatarEmpregado',
})
export class AvatarEmpregadoPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const blacklist = ['c048286', 'c032425'];
    if (!value) value = 'c000000';
    if (blacklist.includes(value.toLowerCase())) {
      value = 'c000000';
    }
    return `${env}administrativo-free/funcionarios/avatar/${value.toLowerCase()}`;
  }
}
