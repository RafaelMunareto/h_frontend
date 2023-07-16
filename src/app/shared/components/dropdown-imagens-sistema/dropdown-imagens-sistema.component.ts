import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { combineLatest, map } from 'rxjs';
import { DropdownImagensSistemaStore } from './dropdown-imagens-sistema.store';
import {
  Component,
  OnInit,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { UploadService } from '../../services/upload.service';
import { IdImageDirective } from '../../directive/id-image.directive';
import { DropdownImagensSistemaService } from './dropdown-imagens-sistema.service';
import { ImageModule } from 'primeng/image';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'app-dropdown-imagens-sistema',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    IdImageDirective,
    ButtonModule,
    TooltipModule,
    FileUploadModule,
    ImageModule,
    FormsModule,
    DialogModule,
    InputSwitchModule,
  ],
  templateUrl: './dropdown-imagens-sistema.component.html',
  styleUrls: ['./dropdown-imagens-sistema.component.sass'],
  providers: [DropdownImagensSistemaService, DropdownImagensSistemaStore],
})
export class DropdownImagensSistemaComponent implements OnInit, OnChanges {
  @Input() sistema = '';
  @Input() valorInicial?: number;
  @Input() label = '';
  @Input() floatingLabel = false;
  @Input() podeEnviar = true;
  @Input() podeVisualizar = true;
  @Output() onChange = new EventEmitter<number>();
  @ViewChild('pfu') pFileUpload?: FileUpload;
  model = 0;
  visible = false;
  darkMode = false;
  zoom = 1;
  store = inject(DropdownImagensSistemaStore);
  uploadService = inject(UploadService);
  arquivos$ = this.store.arquivos$;
  carregando$ = this.store.carregando$;
  vm$ = combineLatest([this.arquivos$, this.carregando$]).pipe(
    map(([arquivos, carregando]) => ({ arquivos, carregando }))
  );

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sistema']?.currentValue) {
      this.store.setSistema(changes['sistema']?.currentValue);
    }
    if (changes['valorInicial']?.currentValue) {
      this.model = changes['valorInicial']?.currentValue;
    }
  }

  constructor() {}

  ngOnInit(): void {}

  uploadHandler(event: any) {
    this.store.uplooad(event.files[0]);
    this.pFileUpload?.clear();
  }

  openModal() {
    this.zoom = 1;
    this.darkMode = false;
    this.visible = true;
  }

  urlSelectedImg() {
    if (!this.model) {
      return '';
    }
    return this.uploadService.getUrl(this.model);
  }
}
