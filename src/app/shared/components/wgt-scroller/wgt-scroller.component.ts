import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UnidadesState } from 'src/app/core/store/unidades/unidades.reducer';
import { fromUnidades } from 'src/app/core/store/unidades/unidades.selector';
import { CardStore, InfoVisao } from 'src/app/pages/varejo/new-raiox/card.store';
import { RaioxWidget } from 'src/app/pages/varejo/new-raiox/models/RaioxWidget';
import { WgtGrupo } from 'src/app/pages/varejo/new-raiox/models/WgtGrupo';
import { WgtGrupoItem } from 'src/app/pages/varejo/new-raiox/models/WgtGrupoItem';
import { NewRaioxService } from 'src/app/pages/varejo/new-raiox/new-raiox.service';
import { WidgetsDirective } from '../../directive/face-widgets.directive';
import { FuncoesGeraisService } from '../../functions/funcoes-gerais.service';

@Component({
  selector: 'app-wgt-scroller',
  templateUrl: './wgt-scroller.component.html',
  styleUrls: ['./wgt-scroller.component.sass']
})
export class WgtScrollerComponent implements OnInit{

    unidade: number = 0;
    arrWdgts: any[] = [];
    loadingCards: boolean = true;
    allSubs = new Subscription;
    
    @ViewChild(WidgetsDirective, { static: false }) widgetTemp!: WidgetsDirective;

    @Input() widgets: number[] = [];
    @Input() carStyle: boolean = false;

    constructor(
        private rxService: NewRaioxService,
        private unidadesStore: Store<UnidadesState>,
        private chgDetector: ChangeDetectorRef,
        private fg: FuncoesGeraisService,
        private cardStore: CardStore
    ){}

    ngOnInit(): void {
        this.unidadesStore.select(fromUnidades.selecionada).subscribe(
            (r:any) => {
                this.unidade = r?.nu_unidade ?? 0;
                this.loadData();
            }
        );
    }

    loadData(){
        this.loadingCards = true;
        this.allSubs = this.rxService.getAllWidgets(this.unidade).subscribe({ 
            next: (a:any)=>{

                if(this.widgets.length == 0){
                    this.widgets = a.cardsUsuario;
                }

                this.arrWdgts = [];
                a.cards.forEach((w:WgtGrupo)=>{
                    this.arrWdgts.push(...w.cards);
                });

                let allVisoes = this.arrWdgts.map((cd:any)=>{
                    return {
                        id_card: cd.id,
                        infoVisao: {
                            descricao: cd.descricao,
                            visaoResumida: cd.visoes.map((f:any) => {
                                return {
                                    visao: f.visao.no_visao,
                                    descricao: f.no_descricao_resumida,
                                }
                            }),
                            visaoExpandida: (cd.eh_expansivel) ? cd.visoes.map((f:any) => {
                                return {
                                    visao: f.visao.no_visao,
                                    descricao: f.no_descricao_expandida,
                                }
                            }) : [],
                        } as InfoVisao,
                        visoes: cd.visoes.map(
                            (v:any)=>{
                                return { label: v.visao.no_visao, value: v.id_visao }
                            }
                        )
                    };
                });
                this.cardStore.addCards(allVisoes);

                this.arrWdgts = this.arrWdgts.filter((w:WgtGrupoItem)=>{ return this.widgets.includes(w.id) });

                this.widgetTemp.viewContainerRef.clear();
                this.widgets.map((u:number)=>{
                    let c = this.arrWdgts.find((card:WgtGrupoItem)=>{ return card.id == u});
                    if(c) this.createCompFromStr(c.id, c);
                });
                this.loadingCards = false;
            },
            error: (e) =>{
                this.loadingCards = false;
                this.fg.actionsForCustom('Erro ao carregar cards!', e.error.message, 'error', 4000);
            }
        });
    }

    createCompFromStr(mw:number=1, wd:WgtGrupoItem){
        if(wd?.componente){
          import(`../../../pages/varejo/new-raiox/visao-item/${wd.componente.no_componente}/${wd.componente.no_componente}.component`).then(
            (comp:any)=>{
              if(comp){
                this.chgDetector.detectChanges();
                let viewContainerRef = this.widgetTemp.viewContainerRef;
                this.getCardHolder(mw)?.append(viewContainerRef?.element?.nativeElement);
                let cp = comp[Object.keys(comp)[0]];
                if(cp) {
                  let wInstance = viewContainerRef.createComponent<RaioxWidget>(cp);
                  let inst = wInstance.instance;
                  inst.widgetId = wd.id;
                  inst.tituloCard = wd.no_card;
                  inst.isDashboard = true;
                  inst.unidade = this.unidade ?? 0;
                  inst.item = 0;
                  inst.expand = wd.eh_expansivel;
                  
                  // Carrega a primeira visão do card
                  inst.visao = wd.visoes[0].id_visao;
                }
              }
            }
          )
        }
    }

    getCardHolder(id:string|number): HTMLDivElement{
        return (document.getElementById('cardHolder_' + id) as HTMLDivElement) ?? null;
    }


}
