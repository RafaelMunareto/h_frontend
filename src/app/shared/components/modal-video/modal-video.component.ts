import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ModalVideoService } from './modal-video.service';


@Component({
  selector: 'app-modal-video',
  templateUrl: './modal-video.component.html',
  //styleUrls: ['./modal-video.component.sass']
})
export class ModalVideoComponent implements OnInit {

  @Input() link!:any;
  
  @Input() sistema!: any;

  showModal:boolean = false;
  tituloModal:string = "";

  constructor(private serv: ModalVideoService,
              private msg: MessageService) { }

  ngOnInit(){
    this.action();
  }
 
  action(){
    
    this.tituloModal = "Tutorial - " +this.sistema;

    this.serv.verifica(this.sistema)
      .subscribe( (res:any) => {
        if(res.descadastrado == false){
          this.showModal = true;
        }
      });
  }

  visualizar(){
    this.showModal = true;
  }

  descadastrar(){
    this.serv.unsubscribe(this.sistema)
      .subscribe( () => { 
          this.msg.add({severity:'success', summary:'Usuário descadastrado com sucesso!'});
          this.showModal = false;
      });
  }
}