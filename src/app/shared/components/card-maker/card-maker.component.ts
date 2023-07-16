import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface jsonCard{
  titulo?: string,
  subTitulo?: string,
  classificacao?: string,
  data?: string,
  areaResp?: string,
  acoes?: { id:number, titulo: string, texto: string, produto: string }[]
}

declare var html2canvas:any;

@Component({
  selector: 'app-card-maker',
  templateUrl: './card-maker.component.html',
  styleUrls: ['./card-maker.component.sass']
})
export class CardMakerComponent {

  @Input('cardData') cardData: jsonCard = {};
  @Input('cardWidth') cardWidth: string = "100%";
  @Output('onError') erroCard = new EventEmitter<any>();

  colorClass = '';
  themes: any[] = [
    { label: "Cores Caixa" , value: "", paleta: ['#004ea3','#f39200','#40b1b7a6'] },
    { label: "Céu" , value: "card-blue", paleta: ['#004ea3','#002259', '#a6d7eb'] },
    { label: "Aurora" , value: "card-blue-turquoise", paleta: ['#004ea3','#53baab', '#f78a30'] },
    { label: "Prata Celeste" , value: "card-grey-blue", paleta: ['#a5a3a3','#005CA9', '#f0eded'] },
    { label: "Prata Entardecer" , value: "card-grey-orange", paleta: ['#a5a3a3','#e9a34c', '#f0eded'] },
    { label: "Neve" , value: "card-white", paleta: ['#004ea3','#fff', '#2ebbc982'] },
    { label: "Lavanda" , value: "card-purple", paleta: ['#7B4267','#e9a34c', '#424e7b'] },
    { label: "Lavanda Neve" , value: "card-purple-white", paleta: ['#7B4267','#fff', '#424e7b'] },
  ];
  selectedTheme = { label: "Cores Caixa" , value: "", paleta: ['#004ea3','#f39200','#40b1b7a6'] };

  creatingCard = false;

  constructor() { }
    
  async takePicture(){

    this.creatingCard = true;

    let picDiv = document.querySelector('#card-maker-main-div')?.parentElement;

    let win = (document.getElementById('iCard') as HTMLIFrameElement).contentWindow;

    win?.document.open();
    win?.document.write(
      `<style>
        body{
          margin: 0 !important;
          padding: 0 !important;
          font-size: 75%;
          width: 100%;
          font-family: futura,-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        }
        .custom-card {
          background: linear-gradient(to right, #004ea3, #009ccf);
          position: relative;
          padding: 20px 20px 10px;
          width: 100%;
        }
        .custom-card img {
          width: 120px;
          right: 10px;
          top: 10px;
          position: absolute;
        }
        .custom-card .custom-card-header {
          background: linear-gradient(45deg, #f39200, #ffd492);
          color: white;
          text-align: center;
          padding: 7px;
          transform: skew(-25deg);
          position: relative;
          z-index: 3;
          font-weight: 700;
          font-size: 110%;
        }
        .custom-card .custom-card-title {
          font-size: 180%;
          color: white;
          margin-top: 40px;
          text-align: center;
          text-shadow: 2px 2px 1px #00000078;
          z-index: 2;
          position: relative;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .custom-card .custom-card-sub {
          font-size: 130%;
          color: white;
          text-align: center;
          margin-top: 0px;
          margin-bottom: 25px;
          text-shadow: 1px 1px 1px #00000078;
        }
        .custom-card .custom-card-text {
          background: rgba(64, 177, 183, 0.65);
          color: white;
          padding: 25px 10px 10px;
          text-align: justify;
          margin-top: -15px;
          margin-bottom: 10px;
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;
          font-weight: 500;
          font-size: 102%;
          z-index: 2;
          position: relative;
          white-space: pre-wrap !important;
        }
        .card-blue .custom-card-text {
          background: rgba(255, 255, 255, 0.65);
          color: #1c1c1c;
        }
        .card-blue .custom-card-header {
          color: white;
          background: linear-gradient(45deg, #002259, #0276cb);
        }
        .card-white .custom-card-text {
          background: rgba(46, 187, 201, 0.51);
          color: white;
        }
        .card-white .custom-card-header {
          background: white;
          color: #e57617;
        }
        .card-purple.custom-card {
          background: linear-gradient(to right, #7B4267 40%, #424e7b);
        }
        .card-purple .custom-card-text {
          background: rgba(20, 20, 20, 0.23);
          color: #e3e3e3;
        }
        .card-purple .custom-card-header {
          background: #e9a34c;
          color: white;
        }
        .card-purple-white.custom-card {
          background: linear-gradient(to right, #7B4267 40%, #424e7b);
        }
        .card-purple-white .custom-card-text {
          background: rgba(20, 20, 20, 0.23);
          color: #e3e3e3;
        }
        .card-purple-white .custom-card-header {
          background: white;
          color: #e57617;
        }
        .card-blue-turquoise.custom-card {
          background: linear-gradient(to right, #005CA9, #54BBAB);
        }
        .card-blue-turquoise .custom-card-text {
          background: rgba(0, 0, 0, 0.14);
          color: white;
        }
        .card-blue-turquoise .custom-card-header {
          background: linear-gradient(45deg, #53baab, #f78a30);
          color: white;
        }
        .card-grey-blue.custom-card {
          background: linear-gradient(to right, #edecec, #a5a3a3);
        }
        .card-grey-blue .custom-card-text {
          background: rgba(255, 247, 247, 0.42);
          color: #626262;
        }
        .card-grey-blue .custom-card-header {
          background: linear-gradient(45deg, #005CA9, #4d92cb);
          color: white;
        }
        .card-grey-blue .dt-footer {
          background: rgba(0, 0, 0, 0.239216);
          padding: 2px 6px;
          border-radius: 3px;
        }
        .card-grey-orange.custom-card {
          background: linear-gradient(to right, #edecec, #a5a3a3);
        }
        .card-grey-orange .custom-card-text {
          background: rgba(255, 247, 247, 0.42);
          color: #626262;
        }
        .card-grey-orange .custom-card-header {
          background: #e9a34c;
          color: white;
        }
        .card-grey-orange .dt-footer {
          background: rgba(0, 0, 0, 0.239216);
          padding: 2px 6px;
          border-radius: 3px;
        }
        .firula-caixa {
          border-top: solid 2px #f49405;
          width: 110px;
          transform: rotate(66deg);
          position: absolute;
          z-index: 1;
        }
        .firula-caixa.top {
          top: 50px;
          left: 0px;
        }
        .firula-caixa.bottom {
          bottom: 50px;
          right: 0px;
        }
        .classificacao {
          font-size: 80%;
          color: white;
          z-index: 2;
          position: absolute;
          background: #0000003d;
          padding: 2px 6px;
          border-radius: 3px;
          top: 10px;
          left: 10px;
          font-weight: 500;
        }
        .custom-card-footer {
          display: flex;
          justify-content: space-between;
          font-size: 80%;
          color: white;
          align-items: center;
          font-weight: 100;
          z-index: 3;
          position: relative;
        }
        .un-resp {
          background: rgba(0, 0, 0, 0.239216);
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 120%;
          font-weight: 600;
          z-index: 2;
        }
        .dt-footer {
          font-size: 110%;
          letter-spacing: 1px;
        }
      </style>`
    );
    win?.document.write(picDiv!.innerHTML);
    win?.document.close();

    setTimeout(() => {
      html2canvas(win!.document.getElementById('card-maker-main-div'), { logging: false, allowTaint: true})
        .then(
          (canvas:any)=>{
            var lnk = document.createElement('a');
            lnk.href = canvas.toDataURL();
            lnk.download = 'card.jpg';
            document.body.appendChild(lnk);
            lnk.click();
            document.body.removeChild(lnk);
            this.creatingCard = false;
            win?.document.open();
            win?.document.write("");
            win?.document.close();
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
