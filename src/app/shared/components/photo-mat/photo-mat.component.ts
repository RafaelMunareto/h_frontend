import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-photo-mat',
  templateUrl: './photo-mat.component.html',
  styleUrls: ['./photo-mat.component.sass']
})
export class PhotoMatComponent {

  photo!:any;
  @Input() matricula:any;
  @Input() tamanhoImagem:number = 5;
  @Input() paddingImagem:boolean = true;

  retornaClass()
  {
    if (this.tamanhoImagem < 1)
      this.tamanhoImagem = 1;
    else if (this.tamanhoImagem > 5)
      this.tamanhoImagem = 5;
    return "photo-mat"+this.tamanhoImagem.toString();
  }
}
