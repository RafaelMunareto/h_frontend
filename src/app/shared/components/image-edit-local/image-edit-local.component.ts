import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FuncoesGeraisService } from 'src/app/shared/functions/funcoes-gerais.service';
import { take, finalize, switchMap, tap, map } from 'rxjs/operators';
import { UploadService } from 'src/app/shared/services/upload.service';
import { ImageEditLocalService } from './image-edit-local.service';

@Component({
  selector: 'app-image-edit-local',
  templateUrl: './image-edit-local.component.html',
  styleUrls: ['./image-edit-local.component.sass'],
})
export class ImageEditLocalComponent implements OnInit, OnChanges {

  @ViewChild('imgDragDiv') imgEl!: ElementRef;

  @Input() isBoss = false;
  @Input() isHovering = false;
  @Input() unidade: string|number = '';
  @Input() maxHeight: number = 200;
  @Input() maxWidth: number = 1579;
  @Input('corDeFundo') bkColor: string = '#dcdcdc';
  @Input('sistema') sysName:string = '';
  @Input('image') tempImg: any = '';
  @Output() coverImgUpdated = new EventEmitter<any>();
  @Input('loading') uploading: boolean = false;

  visible = false;
  loadingPreview = false;
  uploadURL = '';

  upNewWidth = 0;
  upNewHeight = 0;
  hasFile = false;
  id_arquivo = 0;
  upFile?: File | null;
  upFileType = '';
  name = '';
  isImgMoving = false;
  isCapturing = false;
  oldImage: string = '';
  externalChange: boolean = false;
  
  constructor(
    private funcoesGeraisService: FuncoesGeraisService,
    private uploadService: UploadService
  ) {}
  
  ngOnInit(): void {
    this.oldImage = this.tempImg;
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['tempImg'] && !this.hasFile){
      this.oldImage = changes['tempImg'].currentValue;
    }
  }

  previewFile(evt: any, imgEl: HTMLDivElement) {
    this.upNewWidth = 0;
    this.upNewHeight = 0;

    if (evt.target.files && evt.target.files[0]) {
      this.hasFile = true;
      this.upFile = evt.target.files[0];

      if (!this.upFile) {
        return;
      }

      this.upFileType = 'img';
      this.loadingPreview = true;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.tempImg = e.target.result;
        let pseudoImg = new Image();
        pseudoImg.src = this.tempImg;
        pseudoImg.onload = () => {
          imgEl.setAttribute('imgheight', pseudoImg.height.toString());
          imgEl.setAttribute('imgwidth', pseudoImg.width.toString());
          imgEl.setAttribute('origHeight', pseudoImg.height.toString());
          imgEl.setAttribute('origWidth', pseudoImg.width.toString());
          imgEl.style.backgroundPositionX =
            imgEl.clientWidth / 2 - pseudoImg.width / 2 + 'px';
          imgEl.style.backgroundPositionY =
            imgEl.clientHeight / 2 - pseudoImg.height / 2 + 'px';
          imgEl.style.backgroundSize = `${pseudoImg.width}px ${pseudoImg.height}px`;
          this.name = evt.target.files[0].name;
          this.upFile = evt.target.files[0];
        };
      };
      reader.readAsDataURL(evt.target.files[0]);
    }
  }

  movingImage = (ev: MouseEvent) => {
    if (this.uploading) {
      return;
    }

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

  toggleDragging(evt: MouseEvent, end: boolean) {
    if (this.uploading) {
      return;
    }

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
    if (this.uploading) {
      return;
    }

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
    if (this.uploading) {
      return;
    }

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
    if (this.uploading) {
      return;
    }

    let upImageWidth = parseFloat(imgEl.getAttribute('imgwidth')!);
    let upImageHeight = parseFloat(imgEl.getAttribute('imgheight')!);
    imgEl.style.backgroundPositionY =
      imgEl.clientHeight / 2 - upImageHeight / 2 + 'px';
    imgEl.style.backgroundPositionX =
      imgEl.clientWidth / 2 - upImageWidth / 2 + 'px';
  }

  setOriginalSize(imgEl: HTMLDivElement) {
    if (this.uploading) {
      return;
    }

    imgEl.style.transition = 'all 0.4s';
    let imgWid = imgEl.getAttribute('origWidth')!;
    let imgHei = imgEl.getAttribute('origHeight')!;
    imgEl.style.backgroundSize = `${imgWid}px ${imgHei}px`;
    this.updateSizeValues(imgEl, parseFloat(imgWid), parseFloat(imgHei));
    this.centerImage(imgEl);
  }

  keepSize(imgEl: HTMLDivElement, s: string) {
    if (this.uploading) {
      return;
    }

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
    if (this.uploading) {
      return;
    }
    imgEl.setAttribute('imgwidth', newWidth.toString());
    imgEl.setAttribute('imgheight', newHeight.toString());
    this.upNewHeight = newHeight;
    this.upNewWidth = newWidth;
  }

  removeMedia(imgEl: HTMLDivElement) {
    this.hasFile = false;
    this.upFile = null;
    this.upFileType = 'none';
    this.id_arquivo = 0;
    this.isHovering = false;
    this.tempImg = this.oldImage;
    imgEl.style.backgroundPosition = '0px 0px';
    imgEl.style.backgroundSize = '100% 100%';
  }

  uploadImage(imgEl: HTMLDivElement) {
    this.uploading = true;
    this.isCapturing = true;
    setTimeout(async () => {
      const img = document.createElement('img');
      img.src = this.tempImg;
      const imgH = parseFloat(imgEl.getAttribute('imgheight')!);
      const imgW = parseFloat(imgEl.getAttribute('imgwidth')!);
      const oriW = parseFloat(imgEl.getAttribute('origWidth')!);
      const oriH = parseFloat(imgEl.getAttribute('origHeight')!);
      const imgCanvas = document.createElement('canvas') as HTMLCanvasElement;
      imgCanvas.height = imgH;
      imgCanvas.width = imgW;
      const imgCanvasCtx = imgCanvas.getContext('2d');
      imgCanvasCtx?.drawImage(img, 0, 0, oriW, oriH, 0, 0, imgW, imgH);
      const cropCanvas = document.createElement('canvas') as HTMLCanvasElement;
      cropCanvas.height = this.maxHeight;
      cropCanvas.width = this.maxWidth; 
      const cropCanvasCtx = cropCanvas.getContext('2d');
      let posY = parseFloat(imgEl.style.backgroundPositionY!.replace('px', ''));
      let posX = parseFloat(imgEl.style.backgroundPositionX!.replace('px', ''));
      cropCanvasCtx!.fillStyle = this.bkColor;
      cropCanvasCtx!.fillRect(0,0,cropCanvas.width,cropCanvas.height);
      cropCanvasCtx!.drawImage(
        imgCanvas,
        0,
        0,
        imgCanvas.width,
        imgCanvas.height,
        posX,
        posY,
        imgCanvas.width,
        imgCanvas.height
      );
      cropCanvas.toBlob((blob) => {
        const file = new File(
          [blob as BlobPart],
          `cover_imagem_${this.unidade}.jpg`,
          {
            type: 'image/jpeg',
          }
        );
        this.uploadService
          .upload(this.sysName, file)
          .pipe(
            map((data:any) => {
              this.uploadURL = data.download_por_id;
              return data.id;
            }),
            // switchMap((id) =>
            //   this.profileService.updateBack(
            //     +this.unidade,
            //     String(id)
            //   )
            // ),
            take(1),
            finalize(() => {
              this.uploading = false;
              this.isCapturing = false;
            })
          )
          .subscribe(
            (data) => {
              this.coverImgUpdated.emit(this.uploadURL);
              this.removeMedia(this.imgEl.nativeElement);
            },
            () => {
              this.funcoesGeraisService.actionsForError(
                'Erro',
                'Houve um erro ao fazer o upload da imagem. Tente novamente.'
              );
            }
          );
      }, 'image/jpeg');
    }, 100);
  }
}
