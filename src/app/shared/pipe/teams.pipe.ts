import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'teams',
  standalone: true,
})
export class TeamsPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(value: any) {
    // let url = "sip:" + value + "@corp.caixa.gov.br";
    return this.domSanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
