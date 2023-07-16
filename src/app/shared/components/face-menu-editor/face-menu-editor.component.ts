import { Item, Grupo } from './face-menu-editor.model';

import { Component, OnInit } from '@angular/core';
import { FaceMenuEditorStore } from './face-menu-editor.store';
import { of } from 'rxjs';

@Component({
  selector: 'app-face-menu-editor',
  templateUrl: './face-menu-editor.component.html',
  styleUrls: ['./face-menu-editor.component.sass'],
})
export class FaceMenuEditorComponent implements OnInit {
  constructor(private faceMenuEditorStore: FaceMenuEditorStore) {}


  ngOnInit(): void {
    this.faceMenuEditorStore.getDecoracoes();
    this.faceMenuEditorStore.getItens();
    this.faceMenuEditorStore.getGrupos();
    this.faceMenuEditorStore.getExibicoes();
  }


}
