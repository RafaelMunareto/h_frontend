import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { Funcionario } from 'src/app/core/models/Funcionario';
import { UnidadesState } from 'src/app/core/store/unidades/unidades.reducer';
import { fromUnidades } from 'src/app/core/store/unidades/unidades.selector';
import { FaceCaixaService } from 'src/app/pages/varejo/face-caixa/face-caixa.service';
import { environment } from 'src/environments/environment';
import 'src/assets/js/quill-emoji.js';
import { NovaPostagem, NovaPostagemMarcacao } from 'src/app/pages/home/shared/components/face-caixa-home/face-caixa-home.models';
import { Editor } from 'primeng/editor';

@Component({
  selector: 'app-marca-unidade',
  templateUrl: './face-marca-unidade.component.html',
  styleUrls: ['./face-marca-unidade.component.sass'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MarcaUnidadeComponent,
      multi: true
    }
  ]
})
export class MarcaUnidadeComponent implements OnInit, ControlValueAccessor {

  @Input() formErro: boolean|null = false;
  @Output('unidadesMarcadas') unidadesMarcadas = new EventEmitter<NovaPostagemMarcacao>();

  // @Input() buildMarks: boolean = false;
  // @Output() buildMarksChange = new EventEmitter<boolean>();

  @Input() hasHeader: boolean = true;
  @Input() customHeight: string = '220px';
  @Input() customWidth: string = '100%';
  @Input() customFontSize: string = '1rem';
  @Input() customPlaceholder: string = 'Texto do post...';
  @Input() initialEditValue: string = '';

  @ViewChild('origEditor') origEditor!: Editor;

  markColor = '#a30ed4';
  normalColor = '#495057';
  isMarkingColor = '#495056';
  oldPrevChar = '';
  currentChar = '';
  leftBugInterval: any;
  public quill: any;
  unidades: any = [];
  unidadesFiltered: any[] = [];
  isMarking: boolean = false;
  markingX: number = 0;
  currX: number = 0;
  unList: any;
  searchList:any;
  selectionHasAt: boolean = false;
  loadingListaUns: boolean = true;
  mrkUns: NovaPostagemMarcacao = {
    matricula: [],
    unidade: []
  };
  pEditorContent: string = "";
  @Output() pEdiotrContentUpdate = new EventEmitter<string>();
  editorTxt: string = '';
  matriculas: any[] = [];
  matriculasFiltered: any[] = [];

  customModules = {
    "emoji-toolbar": false,
    "emoji-shortname": true,
    "emoji-textarea": true,

    }

  constructor(private storeUn: Store<UnidadesState>, private faceService: FaceCaixaService) { }

  writeValue(obj: any): void {
    this.editorTxt = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {


    this.loadingListaUns = true;

    this.matriculasFiltered = [];
    this.storeUn.select(fromUnidades.lista).subscribe(
      (uns:any)=>{
        this.unidades = [...uns];
        this.unidadesFiltered = [];
        this.loadingListaUns = false;
      }
      );

      window.addEventListener('click', (evt:MouseEvent)=>{
        let trg = (evt.target as HTMLDivElement).classList;
        let trgP = (evt.target as HTMLDivElement).offsetParent?.id;
        if(!trg.contains('ql-editor') && trgP != 'marcaUnLista'){
          this.hideList();
        }
      });

      if (this.initialEditValue){
        this.pEditorContent = this.initialEditValue;
      }
    }

    onChange(val:string){};
    onTouched(){};

    startEditor(evt: any){
      if (!this.quill) {
        this.quill = evt.editor;
        this.quill.on('selection-change', (range:any)=>{
          if(range){
            var text = this.quill.getText(range.index, range.length);
          if (text.includes('@')) this.selectionHasAt = true;
        }
      })
    }
  }

  markUn(un_mat: string, nome: string) {
    let startIndex = this.markingX - 1;
    un_mat = un_mat.toString().padStart(4,'0');
    let newText = `@${un_mat}-${nome}`;
    let selLength = (this.currX - startIndex) < 1 ? 1 : (this.currX - startIndex);
    this.quill.setSelection(startIndex, selLength);
    this.quill.deleteText(startIndex, selLength);
    this.quill.insertText(startIndex, newText, {
      'color': this.markColor,
      'bold': true
    });
    this.quill.insertText(this.quill.getSelection().index, ', ', {
      'color': this.normalColor,
      'bold': false
    });
    this.hideList();
    //trick pra forçar atualização da variável quando só tem a marcação
    this.pEditorContent = this.origEditor.quill.root.innerHTML;
    this.pEdiotrContentUpdate.emit(this.pEditorContent);
  }

  async hideList(isBackSpace:boolean = false) {
    if (this.unList) {
      this.unList.style.zIndex = '-1';
      this.unList.style.opacity = '0';
      this.isMarking = false;
      if (this.quill.getSelection()) {
        this.currX = this.quill.getSelection().index;
        this.currentChar = this.quill.getText(this.quill.getSelection().index, 1).trim();
        // let prevCharFormat = this.quill.getFormat(this.currX - 1, 1).color;
        let thisCharColor = this.quill.getFormat().color;
        let nxChar = this.quill.getFormat(this.currX + 1).color;
        let pChar = this.quill.getText(this.currX - 1, 1);
        if (
          (thisCharColor == this.markColor && pChar != '' && nxChar == this.markColor  ) ||
          (thisCharColor != this.markColor && nxChar == this.markColor && pChar != "") ||
          isBackSpace
        ){
          let markStart = -1;

          let lastMarkChar = 0;
          if(isBackSpace){
            lastMarkChar = this.currX;
          } else {
            let checkColor = this.quill.getFormat().color;
            if(checkColor == undefined) checkColor = nxChar;
            for (let z = this.currX; checkColor == this.markColor; z++) {
              lastMarkChar = z;
              checkColor = this.quill.getFormat(z, 1).color;
            }
          }

          for (let i = this.currX; i >= 0; i--) {
            let currChar = await this.quill.getText(i, 1);
            if (currChar == '@') {
              markStart = i;
              break;
            }
          }
          if (markStart >= 0) {
            this.quill.setSelection(markStart);
            this.quill.setSelection(markStart, lastMarkChar - markStart);
          }
        };
      }
    }
  }

  unFormatBack(evt: KeyboardEvent){
    if(evt.key == 'Backspace'){
      let erasingMark = this.quill.getFormat().color == this.markColor;
      if(erasingMark){
        evt.preventDefault();
        this.hideList(erasingMark);
      }
    }
  }

  async waitCursor(evt: KeyboardEvent, list: HTMLDivElement) {

    let pseudoAt = false;
    if((evt.key == 'Shift')){
      if(this.quill.getText(this.quill.getSelection().index - 1, 1) == '@')
        pseudoAt = true;
    }
    if((evt.key == 'Escape')){
      await this.hideList();
    }

    // let erasingMark = this.quill.getFormat(this.quill.getSelection().index - 1,1).color == this.markColor;
    let erasingMark = this.quill.getFormat().color == this.markColor;

    if(evt.key == 'Backspace'){
      if(this.isMarking && this.oldPrevChar.trim() == '@'){
        await this.hideList(erasingMark);
      }
    }

    if(this.quill.getSelection()){
      this.currentChar = this.quill.getText(this.quill.getSelection().index, 1).trim();
    }

    if(evt.key == 'Delete'){
      if(this.isMarking && (this.currentChar.trim() == '@' || this.oldPrevChar.trim() == '@' || this.selectionHasAt)){
        await this.hideList();
        let qFor = this.quill.getSelection().index;
        let strLen = this.quill.getText(qFor);
        for (let i = qFor; i < strLen.length; i++) {
          if(this.quill.getFormat(i, 1).color != this.isMarkingColor){
            break;
          }
          if(this.quill.getFormat(i, 1).color == this.isMarkingColor){
            this.quill.removeFormat(i, 1);
          }
        }
        // this.getMarkedUns();
      }
    }

    if (evt.key == '@' || pseudoAt) {
      this.matriculasFiltered = [];
      this.unidadesFiltered = [];

      let x = this.markingX = this.quill.getSelection().index;
      let char = this.quill.getText((x - 2), 2);
      this.oldPrevChar = char.trim();
      if (char == ' @' || char == '@' || char == '	@') {

        this.quill.format('color',this.isMarkingColor);

        // this.unidadesFiltered = [...this.unidades];
        this.isMarking = true;
        this.unList = list;
        document.body.appendChild(list);
        let innerCont = this.quill.scrollingContainer.getBoundingClientRect();
        let qBounds = this.quill.getBounds(x);
        list.style.left = (qBounds.left + innerCont.left) + 'px';
        list.style.top = (window.scrollY + qBounds.top + innerCont.top - list.clientHeight - 5) + 'px';
        list.style.zIndex = '99999999';
        list.style.opacity = '1';
      }

    } else {

      let sel = this.quill.getSelection();

      if (sel) {

        this.oldPrevChar = this.quill.getText(sel.index - 1, 1).trim();

        if(!['ArrowRight', 'ArrowLeft'].includes(evt.key)){
          this.currX = sel.index;
        }

      }

      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Tab'].includes(evt.key) || (['ArrowRight', 'ArrowLeft', 'Backspace', 'Delete'].includes(evt.key) && !this.isMarking)) {

        await this.hideList();

      } else {

        let cCharColor = this.quill.getFormat(this.currX - 2);
        if (cCharColor.color == this.markColor && this.currX >= 1) {
          this.quill.setSelection(this.currX - 1, 1);
          this.quill.format('color', this.normalColor);
          this.quill.format('bold', false);
          this.quill.setSelection(this.currX);
        }

        if(this.isMarking){

          let currChar = this.quill.getText(this.currX, 1);
          let isMrkText = this.quill.getFormat(this.currX - 1, 1).color == this.isMarkingColor ? true : false;
          if((['Backspace', 'Delete'].includes(evt.key) && currChar == '@') || (['ArrowRight', 'ArrowLeft'].includes(evt.key) && !isMrkText)){
            await this.hideList();
          }

          clearTimeout(this.searchList);
          this.searchList = setTimeout(() => {
            let srcString = (this.quill.getText(this.markingX, this.currX - this.markingX)).toLowerCase();
            if (srcString.length >= 3) {

              this.loadingListaUns = true;
              this.faceService.getPesquisaEmpregado(srcString)
                .subscribe((empregados: Funcionario[]) => {
                  this.unidadesFiltered = this.unidades.filter(
                    (el:any)=>{
                      return el.nu_unidade.toString().toLowerCase().includes(srcString) || el.no_unidade.toLowerCase().includes(srcString);
                    }
                  );
                  this.matriculasFiltered = empregados;
                  // this.matriculasFiltered = this.matriculas.filter(
                  //   (el:any)=>{
                  //     return el.matricula.toString().toLowerCase().includes(srcString) || el.nome.toLowerCase().includes(srcString);
                  //   }
                  // );
                  if(this.unidadesFiltered.length <=0 && this.matriculasFiltered.length <= 0){
                    this.quill.removeFormat(this.markingX, this.currX - this.markingX);
                    this.hideList();
                  }
                  this.loadingListaUns = false;
                })

            } else {
              this.matriculasFiltered = [];
              this.unidadesFiltered = [];
            }

          }, 500);

        }

      }

    }

    this.onChange(this.pEditorContent);
    this.onTouched();
  }

  pasteEditor(evt:any){
    evt.preventDefault();
    let newText = evt.clipboardData.getData('text');
    let pasteDiv = document.querySelector('input[data-formula="e=mc^2"]');
    if(pasteDiv){
      if(pasteDiv === document.activeElement){
        (pasteDiv as HTMLInputElement).value = newText;
        return;
      }
    }
    this.quill.focus();
    this.quill.insertText(this.quill.getSelection().index, newText);
    this.onChange(this.pEditorContent);
    this.onTouched();
  }

  async adjustLeft() {

    let toolDiv: any = undefined;
    clearInterval(this.leftBugInterval);
    this.leftBugInterval = setInterval(() => {
      toolDiv = document.querySelector('div.ql-tooltip');
      if (toolDiv) {
        clearInterval(this.leftBugInterval);
        if (toolDiv.offsetLeft < 0) {
          toolDiv.style.left = '0px';
        }
      }
    }, 100);

  }

  public getMarkedUns(){
    let content = this.quill.getContents().ops;
    this.mrkUns.matricula = [];
    this.mrkUns.unidade = [];
    content.map(
      (el:any) => {
        if(el?.attributes?.color == this.markColor){
          let key = el.insert.substring(1,el.insert.indexOf('-'));
          let label = el.insert.substring(el.insert.indexOf('-')+1, el.insert.length);
          key = key.toLowerCase();
          if(key.startsWith('c')){
            this.mrkUns.matricula.push({ nu_matricula: key.replace('c',''), no_empregado: label });
          } else {
            this.mrkUns.unidade.push({ nu_unidade: key, no_unidade: label });
          }
        }
      }
    );
    this.unidadesMarcadas.emit(this.mrkUns);
  }

  public clearContents(){
    this.pEditorContent = '';
    // this.quill.setContents('');
    // this.quill.setContents("<p><br></p>");
  }

}
