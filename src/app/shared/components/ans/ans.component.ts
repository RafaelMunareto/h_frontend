import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AnsService } from './ans.service';
import { FuncoesGeraisService } from '../../functions/funcoes-gerais.service';
import { finalize, take } from 'rxjs/operators';
import dayjs from 'src/app/shared/utils/dayjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ans',
  templateUrl: './ans.component.html',
  styleUrls: ['./ans.component.sass']
})
export class AnsComponent implements OnInit {

  displayMaximizable: boolean = true;
  ultimaAnsAssinada: boolean = false;

  @Input() confirmacaoModal: boolean = false;
  @Output() confirmacaoModalChange = new EventEmitter<boolean>();

  @Input() botao: boolean = false;
  @Input() styleClass: string = '';
  @Input() ans: any = {
    matricula : 'C000000'
  };
  @Input() renderAnalitic: boolean = false;

  /*
    mode:
      'auto' -> Modal aparece ao ser criado.
      'btn' -> Botão aparece(assinado/assinar).
      'content' -> O componente controla o conteúdo a ser mostrado de acordo com a assinatura do termo.
  */
  @Input() mode: string = 'auto';

  @Output() isSigned = new EventEmitter<boolean>();

  htmlAns: string = '';
  pass: string = '';

  //enviando POST
  loading: boolean = false;
  loadingAssinatura: boolean = true;

  constructor(private ansService: AnsService,
    private fgs: FuncoesGeraisService,
    private httpClient: HttpClient) { }

  ngOnInit() {
    this.checkANS()
  }



  checkANS(): void {
    this.loadingAssinatura = true;
    this.httpClient
      .get<any>(
        environment.apiUrl + 'ans/assinatura'
      ).subscribe((res: any) => {
        this.ultimaAnsAssinada = res.ultima_ans_assinada;
        this.ans = res;

        if(!this.ultimaAnsAssinada){
          switch (this.mode) {
            case 'btn':
              this.botao = true;
              this.action();
              break;
            case 'content':
              this.action();
              break;
            default:
              this.confirmacaoModal = true;
              this.action();
              break;
          }
        }

        this.loadingAssinatura = false;

    })
  }


  action() {
    if (this.ans.matricula == 'C000000')
      return;
    this.htmlAns = this.ans.html_ans.replace(/\$\$matricula\$\$/g, this.ans.matricula).replace(/\$\$funcao\$\$/g, this.ans.funcao)
    .replace(/\$\$empregado\$\$/g, this.ans.nome).replace(/\$\$unidade\$\$/g, this.ans.unidade).replace(/\$\$data\$\$/g, dayjs().format('DD[ de ]MMMM[ de ]YYYY'));
  }

  cancelDialog() {
    this.displayMaximizable=false;
    this.confirmacaoModal=false;
    this.confirmacaoModalChange.emit(false);
    this.loading = false;
  }

  postANS(): void {
    this.loading = true;
    let obj = {
      "id_ans": this.ans.id_ans,
      "senha" : this.pass
    };
    this.ansService.postANS(obj).pipe(take(1)).subscribe((res: any) =>
    {
      this.fgs.actionsForSuccess("Assinatura do Termo", res.mensagem);
      this.isSigned.emit(true);
      this.ultimaAnsAssinada = true;
      this.confirmacaoModal=false;
    },
    (error:any) => {
      this.isSigned.emit(false);
      this.loading = false;
      this.fgs.actionsForError("Assinatura do Termo", error.error.mensagem);
    });
  }

  btnClick(){
    this.action();
    this.confirmacaoModal = true;
    this.confirmacaoModalChange.emit(true);
  }
}
