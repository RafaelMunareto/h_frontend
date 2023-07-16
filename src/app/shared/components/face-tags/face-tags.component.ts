import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FaceCaixaService } from 'src/app/pages/varejo/face-caixa/face-caixa.service';
import 'src/assets/js/quill-emoji.js';

@Component({
  selector: 'app-face-tags',
  templateUrl: './face-tags.component.html',
  styleUrls: ['./face-tags.component.sass']
})

export class FaceTagsComponent implements OnInit {
  constructor(private serv: FaceCaixaService) {}
  selectedTag: any[] = [];
  @Input() tags: any[] = [];

  ngOnInit(): void {

  }

}
