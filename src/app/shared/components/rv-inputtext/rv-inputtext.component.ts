import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-rv-inputtext',
  templateUrl: './rv-inputtext.component.html',
  styleUrls: ['./rv-inputtext.component.sass'],
})
export class RVInputtextComponent {
  disabled: boolean = true;
  value1: string = '';
  value2: string = '';
  value3: string = '';
  value4: string = '';
  value6: string = '';
  value5: string = 'Disabled';

  constructor() {}
}
