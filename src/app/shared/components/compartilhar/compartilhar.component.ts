import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import { MessageService } from 'primeng/api';
import { CompartilharService } from './compartilhar.service';
import dayjs from 'dayjs';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { UploadResponse } from 'src/app/pages/varejo/face-caixa/face-caixa.service';
import { AuthState } from 'src/app/core/store/auth/auth.reducer';
import { fromAuth } from 'src/app/core/store/auth/auth.selectors';
import { InfoGesun } from 'src/app/core/models/InfoGesun';

@Component({
  selector: 'app-compartilhar',
  templateUrl: './compartilhar.component.html',
  styleUrls: ['./compartilhar.component.sass'],
})
export class CompartilharComponent implements OnInit {

  movingImage = (ev: MouseEvent) => {
    let elem = (ev.target as HTMLDivElement)!;
    let oldMouseYPos = elem.getAttribute('oldMouseYPos') || '0';
    let oldYPos = elem.getAttribute('oldY') || '0';
    let oldMouseXPos = elem.getAttribute('oldMouseXPos') || '0';
    let oldXPos = elem.getAttribute('oldX') || '0';
    elem.style.backgroundPositionY =
      parseInt(oldYPos) + (ev.offsetY - parseInt(oldMouseYPos)) + 'px';
    elem.style.backgroundPositionX =
      parseInt(oldXPos) + (ev.offsetX - parseInt(oldMouseXPos)) + 'px';
    this.isImgMoving = true;
  };

  @Input() target: any = '';
  @Input() titulo: string = '';
  @Input() desenharApenasTable: boolean = false;
  @Input() botaoSomenteComIcone: boolean = false;
  @Input() botaoSimples: boolean = false;
  @Input() nomeArquivo: string = 'compartilhar';
  btnFilhas: boolean = false;
  infoGesunListener: Subscription = new Subscription();
  currUser: InfoGesun = {} as InfoGesun;
  hoje: any = dayjs().format('DD/MM/YYYY');

  isLoadingNew: boolean = false;
  loadingNewText: string = '...';
  displayNewPost: boolean = false;
  displayNewPost2: boolean = false;
  isImgMoving: boolean = false;
  tempImg: any = '';
  upNewWidth: number = 0;
  upNewHeight: number = 0;
  hasFile: boolean = false;
  upFileType = 'none';
  arquivo: any;
  loadImg: boolean = false;
  upFile: any;
  newPost = {
    titulo: '',
    texto: '',
    media: 'Clique no botão ao lado para adicionar ->',
    id_arquivo: 0,
    posX: 0,
    posY: 0,
    imgSize: '',
    tipo_arquivo: 'none',
    link_arquivo: '',
    marcacoes: [],
  };
  imagem: any;
  mrkUns: any = [];

  betaTester: boolean = false;

  //ADVANCED
  @ViewChild('imgDragDiv', { static: false }) expImgDiv!: ElementRef<HTMLDivElement>;
  @Input() advancedMode: boolean = false;

  constructor(
    private compart: CompartilharService,
    private msg: MessageService,
    private storeInfoGesun: Store<AuthState>
  ) {}

  ngOnInit() {
    this.action();
  }

  ngOnDestroy() {
    this.infoGesunListener.unsubscribe();
  }

  action() {
    //this.compart.recoveryTestersFaceCaixa().subscribe((res: any) => this.betaTester = (res.acesso == 1))
    this.betaTester = true;

    this.infoGesunListener = this.storeInfoGesun
      .pipe(select(fromAuth.infoGesun))
      .subscribe((inf: InfoGesun) => {
        this.currUser = inf;
      });
    this.newPost.titulo = this.titulo;
  }

  compartilhar() {
    if (this.betaTester) {
      if (this.target) {
        this.displayNewPost = true;
        this.displayNewPost2 = false;
        this.loadImg = true;
        this.btnFilhas = true;
        this.imagem = null;
        setTimeout(() => {
          this.takePicture();
        }, 200);
      }
    } else {
      this.displayNewPost2 = true;
      this.displayNewPost = false;
    }
  }

  async takePicture() {
    let trg = <HTMLDivElement>document.querySelector('#' + this.target);

    if (this.desenharApenasTable)
      trg = <HTMLDivElement>trg.querySelector('table');

    html2canvas(trg)
      .then((canvas: any) => {
        this.newPost.imgSize = `${canvas.width}px ${canvas.height}px`;
        this.imagem = canvas.toDataURL('image/jpeg');
        this.tempImg = this.imagem;
        
        setTimeout(() => {
          if(this.advancedMode){
            if(this.expImgDiv) this.previewFile(this.expImgDiv.nativeElement);
          }
        }, 100);
        
        if(!this.advancedMode)
          this.loadImg = false;
        var blob = this.dataURItoBlob(this.imagem);
        this.arquivo = blob;
      })
      .finally(() => {
        this.btnFilhas = false;
        this.hasFile = true;
      });

  }

  dataURItoBlob(dataURI: any) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  commitNewPost(form: NgForm) {
    if (form.valid) {
      this.isLoadingNew = true;
      this.loadingNewText = 'Criando novo post...';

      if (this.hasFile) {
        this.loadingNewText = 'Fazendo upload do arquivo, aguarde...';
        this.compart
          .uploadFile(this.arquivo, this.nomeArquivo + '.jpg')
          .pipe(take(1))
          .subscribe(
            (fl: UploadResponse) => {
              if (fl) {
                if (this.advancedMode) {
                  let imgH = parseFloat(this.expImgDiv.nativeElement.getAttribute('imgheight')!);
                  let imgW = parseFloat(this.expImgDiv.nativeElement.getAttribute('imgwidth')!);
                  this.newPost.imgSize = `${imgW}px ${imgH}px`;
                  this.newPost.posX = parseFloat(
                    this.expImgDiv.nativeElement.style.backgroundPositionX
                  );
                  this.newPost.posY = parseFloat(
                    this.expImgDiv.nativeElement.style.backgroundPositionY
                  );
                }
                this.loadingNewText = 'Upload finalizado.';
                this.newPost.link_arquivo = fl.download_por_nome;
                this.newPost.id_arquivo = fl.id;
                this.newPost.tipo_arquivo = 'img';
                this.newPost.marcacoes = this.mrkUns;
                this.createNewPost(form);
              } else {
                this.errorMsg(
                  'Falha no upload do arquivo! Por favor, tente novamente em instantes.',
                  '',
                  5000
                );
                this.isLoadingNew = false;
              }
            },
            (err) => {
              this.errorMsg(
                'Não foi possível fazer o upload do arquivo!',
                err.error.message,
                5000
              );
              this.isLoadingNew = false;
            }
          );
      } else {
        this.newPost.id_arquivo = 0;
        this.newPost.marcacoes = this.mrkUns;
        this.createNewPost(form);
      }
    }
  }

  createNewPost(form: NgForm) {
    this.loadingNewText = 'Publicando novo post...';
    this.compart
      .postNewPost(this.newPost)
      .pipe(take(1))
      .subscribe(
        () => {
          this.displayNewPost = false;
          this.successMsg('Novo post publicado!');
          this.isLoadingNew = false;
          this.loadingNewText = '...';
          form.resetForm();
        },
        (err) => {
          this.errorMsg('Erro ao criar um novo post!', err.error.message, 5000);
          this.isLoadingNew = false;
        }
      );
  }

  successMsg(summ: string, wait: number = 4000) {
    this.msg.add({ summary: summ, severity: 'success', life: wait });
  }

  errorMsg(summ: string, det: string, wait: number = 4000) {
    this.msg.add({ summary: summ, severity: 'error', detail: det, life: wait });
  }

  previewFile(imgEl: HTMLDivElement) {

    this.upNewWidth = 0;
    this.upNewWidth = 0;

    this.upFileType = 'img';

    let pseudoImg = new Image();
    pseudoImg.src = this.tempImg;
    imgEl.setAttribute('imgheight', pseudoImg.height.toString());
    imgEl.setAttribute('imgwidth', pseudoImg.width.toString());
    imgEl.setAttribute('origHeight', pseudoImg.height.toString());
    imgEl.setAttribute('origWidth', pseudoImg.width.toString());
    imgEl.style.backgroundPositionX =
      imgEl.clientWidth / 2 - pseudoImg.width / 2 + 'px';
    imgEl.style.backgroundPositionY =
      imgEl.clientHeight / 2 - pseudoImg.height / 2 + 'px';
    imgEl.style.backgroundSize = `${pseudoImg.width}px ${pseudoImg.height}px`;
    
    this.loadImg = false;

  }

  //MODIFICAÇÃO EDIÇÃO DA IMAGEM - ADVANCED
  toggleDragging(evt: MouseEvent, end: boolean) {
    evt.preventDefault();

    if (this.upFileType == 'img') {
      let el = evt.target as HTMLDivElement;

      if (end == true) {
        this.stopDragging(el);
      } else {
        el.style.transition = 'none';
        el.setAttribute('oldMouseYPos', `${evt.offsetY}`);
        el.setAttribute('oldMouseXPos', `${evt.offsetX}`);
        el.setAttribute('oldY', el.style.backgroundPositionY);
        el.setAttribute('oldX', el.style.backgroundPositionX);
        if (!this.isImgMoving) {
          this.isImgMoving = true;
          el.addEventListener('mousemove', this.movingImage, false);
        }
      }
    }
  }

  stopDragging(imgEl: HTMLDivElement) {
    if (this.isImgMoving && this.upFileType == 'img') {
      let upImageWidth = parseInt(imgEl.getAttribute('imgwidth')!);
      let upImageHeight = parseInt(imgEl.getAttribute('imgheight')!);

      this.isImgMoving = false;
      imgEl.removeEventListener('mousemove', this.movingImage, false);

      if (upImageHeight > imgEl.clientHeight) {
        if (
          parseInt(imgEl.style.backgroundPositionY) + upImageHeight <
          imgEl.clientHeight
        ) {
          imgEl.style.transition = 'all 0.4s';
          imgEl.style.backgroundPositionY =
            imgEl.clientHeight - upImageHeight + 'px';
        }
        if (parseInt(imgEl.style.backgroundPositionY) > 0) {
          imgEl.style.transition = 'all 0.4s';
          imgEl.style.backgroundPositionY = '0px';
        }
      } else {
        imgEl.style.transition = 'all 0.4s';
        imgEl.style.backgroundPositionY =
          imgEl.clientHeight / 2 - upImageHeight / 2 + 'px';
      }

      if (upImageWidth > imgEl.clientWidth) {
        if (
          parseInt(imgEl.style.backgroundPositionX) + upImageWidth <
          imgEl.clientWidth
        ) {
          imgEl.style.transition = 'all 0.4s';
          imgEl.style.backgroundPositionX =
            imgEl.clientWidth - upImageWidth + 'px';
        }
        if (parseInt(imgEl.style.backgroundPositionX) > 0) {
          imgEl.style.transition = 'all 0.4s';
          imgEl.style.backgroundPositionX = '0px';
        }
      } else {
        imgEl.style.transition = 'all 0.4s';
        imgEl.style.backgroundPositionX =
          imgEl.clientWidth / 2 - upImageWidth / 2 + 'px';
      }
    }
  }

  zoomIt(evt: WheelEvent, img: HTMLDivElement) {
    if (this.hasFile && this.upFileType == 'img') {
      evt.preventDefault();
      let imgH = parseFloat(img.getAttribute('imgheight')!);
      let imgW = parseFloat(img.getAttribute('imgwidth')!);
      img.style.transition = 'none';

      let dY = -((evt.deltaY / Math.abs(evt.deltaY)) * 12);
      let imgProp = imgH / imgW;

      if (this.upNewHeight == 0 || this.upNewWidth == 0) {
        this.upNewWidth = imgW;
        this.upNewHeight = imgH;
      }
      this.upNewWidth = this.upNewWidth + dY;
      this.upNewHeight = this.upNewHeight + dY * imgProp;
      img.style.backgroundSize = `${this.upNewWidth}px ${this.upNewHeight}px`;
      img.setAttribute('imgwidth', this.upNewWidth.toString());
      img.setAttribute('imgheight', this.upNewHeight.toString());
      this.centerImage(img);
    }
  }

  centerImage(imgEl: HTMLDivElement) {
    imgEl.style.transition = 'all 0.4s';
    let upImageWidth = parseFloat(imgEl.getAttribute('imgwidth')!);
    let upImageHeight = parseFloat(imgEl.getAttribute('imgheight')!);
    imgEl.style.backgroundPositionY =
      imgEl.clientHeight / 2 - upImageHeight / 2 + 'px';
    imgEl.style.backgroundPositionX =
      imgEl.clientWidth / 2 - upImageWidth / 2 + 'px';
  }

  setOriginalSize(imgEl: HTMLDivElement) {
    imgEl.style.transition = 'all 0.4s';
    let imgWid = imgEl.getAttribute('origWidth')!;
    let imgHei = imgEl.getAttribute('origHeight')!;
    imgEl.style.backgroundSize = `${imgWid}px ${imgHei}px`;
    this.updateSizeValues(imgEl, parseFloat(imgWid), parseFloat(imgHei));
    this.centerImage(imgEl);
  }

  keepSize(imgEl: HTMLDivElement, s: string) {
    imgEl.style.transition = 'all 0.4s';
    let oriW = parseFloat(imgEl.getAttribute('origWidth')!);
    let oriH = parseFloat(imgEl.getAttribute('origHeight')!);
    let difW = imgEl.clientWidth - oriW;
    let difH = imgEl.clientHeight - oriH;
    let imgProp = 0;
    if (s == 'H') {
      imgProp = oriH / oriW;
      imgEl.style.backgroundSize = `${oriW + difH / imgProp}px ${
        imgEl.clientHeight
      }px`;
      this.updateSizeValues(imgEl, oriW + difH / imgProp, imgEl.clientHeight);
    } else {
      imgProp = oriW / oriH;
      imgEl.style.backgroundSize = `${imgEl.clientWidth}px ${
        oriH + difW / imgProp
      }px`;
      this.updateSizeValues(imgEl, imgEl.clientWidth, oriH + difW / imgProp);
    }
    this.centerImage(imgEl);
  }

  updateSizeValues(imgEl: HTMLDivElement, newWidth: number, newHeight: number) {
    imgEl.setAttribute('imgwidth', newWidth.toString());
    imgEl.setAttribute('imgheight', newHeight.toString());
    this.upNewHeight = newHeight;
    this.upNewWidth = newWidth;
  }

}
