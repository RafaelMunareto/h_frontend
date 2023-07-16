import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { take } from 'rxjs/operators';
import { FuncoesGeraisService } from '../../functions/funcoes-gerais.service';
import { PesquisasService } from './pesquisa.service';

export interface PesquisaModel {
  active: boolean;
  created_at: string;
  descricao: string;
  id: number;
  matricula: string;
  nome_pesquisa: string;
  nu_unidade: number;
  opcoes: [
    {
      id: number;
      nome_pesquisa: string;
      texto: string;
      valor: string;
    }
  ];
  pergunta: string;
}

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.sass'],
})
export class PesquisaComponent implements OnInit {
  @ViewChild('cardLike', { static: false }) card!: ElementRef;

  @Input('animado') isAnimated: boolean = true;
  @Input('nomePesquisa') surveyName: string = '';
  @Input('tituloPesquisa') surveyTitle: string = 'Pesquisa';
  @Input('tempoInicio') waitShow: number = 1000;

  survey = {} as PesquisaModel;
  surveyAnswer: string | number = '';
  isSubmitting: boolean = false;
  setVisible: boolean = false;
  isAnswering: boolean = false;

  constructor(
    private pesqService: PesquisasService,
    private func: FuncoesGeraisService
  ) {}

  ngOnInit(): void {
    this.pesqService
      .getSurvey(this.surveyName)
      .pipe(take(1))
      .subscribe((r: any) => {
        if (!r.info) {
          this.setVisible = true;
          this.survey = r;
          setTimeout(() => {
            this.showIt();
          }, 0);
        }
      });
  }

  async showIt() {
    if (!this.card?.nativeElement) {
      return;
    }
    let card = this.card.nativeElement as HTMLDivElement;
    if (this.isAnimated) {
      setTimeout(() => {
        card.classList.add('expanded');
      }, this.waitShow);
    } else {
      card.classList.add('expanded');
    }
  }

  closeIt() {
    let carDiv = this.card.nativeElement as HTMLDivElement;
    if (this.isAnimated) {
      carDiv.classList.add('hidden');
      setTimeout(() => {
        carDiv.remove();
      }, 1000);
    } else {
      carDiv.remove();
    }
  }

  postAnswer() {
    if (this.surveyAnswer != 0 && this.surveyAnswer != '') {
      let data = {
        nome_pesquisa: this.surveyName,
        resposta: this.surveyAnswer,
      };
      this.isAnswering = true;
      this.pesqService
        .postAnswer(data)
        .pipe(take(1))
        .subscribe(
          (r: any) => {
            this.func.actionsForSuccess(
              'Pesquisa respondida!',
              'Obrigado pela colaboração!'
            );
            setTimeout(() => {
              this.closeIt();
            }, 300);
          },
          (err) => {
            this.func.actionsForError(
              'Erro ao responder pesquisa!',
              err.error.message
            );
            this.isAnswering = false;
          }
        );
    } else {
      this.func.actionsForCustom(
        'Atenção!',
        'É necessário preencher uma resposta!',
        'warn',
        5000
      );
      this.isAnswering = false;
    }
  }
}
