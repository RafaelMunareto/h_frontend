import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Unidade } from 'src/app/core/models/Unidade';
import { fromUnidades } from 'src/app/core/store/unidades/unidades.selector';
import { UnidadeStore } from 'src/app/pages/varejo/rede-responde/resposta/formulario/campo/tipos-campos/unidade/unidade.store';
import { FuncoesGeraisService } from '../../functions/funcoes-gerais.service';
import { BingoAp } from './bingo-ap';
import { BingoApService } from './bingo-ap.service';

declare var html2canvas:any;

@Component({
  selector: 'app-bingo-ap',
  templateUrl: './bingo-ap.component.html',
  styleUrls: ['./bingo-ap.component.sass'],
})
export class BingoApComponent implements OnInit {
  @Input() ano: string = '2023';
  @Input() compartilharInicio: boolean = false;
  @Output('onError') erroCard = new EventEmitter<any>();
  unidade?: Unidade;

  dadosBingo: BingoAp[] = [];
  loading: boolean = true;

  visivel_modal: boolean = false;
  creatingCard: boolean = false;

  constructor(
    private storeUnidade: Store<UnidadeStore>,
    private service: BingoApService,
    private fgService: FuncoesGeraisService
  ) { }

  ngOnInit(): void {
    this.storeUnidade.select(fromUnidades.selecionada).subscribe((res) => {
      this.unidade = res;
      this.atualizaDados();
    });
  }

  atualizaDados() {
    if (!this.unidade) return;

    if (!this.ano) return;

    this.loading = true;

    this.service.getFlagBingo(this.unidade.nu_unidade, this.ano).subscribe({
      next: (res: BingoAp[]) => {
        this.dadosBingo = res;
        setTimeout(() => {
          this.loading = false;
        }, 100);
      },
      error: (err: HttpErrorResponse) => { },
    });
  }

  async takePicture(){

    this.creatingCard = true;

       setTimeout(() => {
      html2canvas(document.getElementById('cardExport'), { logging: false, allowTaint: true})
        .then(
          (canvas:any)=>{
            var lnk = document.createElement('a');
            lnk.href = canvas.toDataURL();
            lnk.download = 'card.jpg';
            document.body.appendChild(lnk);
            lnk.click();
            document.body.removeChild(lnk);
            this.creatingCard = false;
          }
        )
        .catch(
          (err:any)=>{
            this.erroCard.emit(err);
            this.creatingCard = false;
          }
        );
    }, 0);

  }

}
