import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DateBrPipe } from './date-br.pipe';
import { DateTimeBrPipe } from './date-time-br.pipe';
import { AvatarEmpregadoPipe } from './avatar-empregado.pipe';
import { SafePipe } from './safe.pipe';
import { FilterPipe } from './filter/filter.pipe';
import { DataEspecialPipe } from './data-especial.pipe';
import { SnakeToTitlePipe } from './snake-to-title.pipe';
import { UnidadePipe } from './unidade.pipe';
import { LimitToPipe } from './limit-to.pipe';
import { TimePipe } from './time.pipe';
import { HoraBr } from './hora-br.pipe';
import { CpfCnpjPipe } from './cpf-cnpj.pipe';
import { PadStartPipe } from './pad-start.pipe';
import { PhoneBrPipe } from './phone-br.pipe';
import { TeamsPipe } from './teams.pipe';
import { EmailPipe } from './email.pipe';
import { TelefonePipe } from './telefone.pipe';
import { CpfPipe } from './cpf.pipe';
import { NumDataType } from './num-data-type.pipe';
import { NomeProprio } from './nome-proprio';

@NgModule({
  imports: [
    CommonModule,
    DateTimeBrPipe,
    SnakeToTitlePipe,
    DateBrPipe,
    AvatarEmpregadoPipe,
    SafePipe,
    FilterPipe,
    DataEspecialPipe,
    UnidadePipe,
    LimitToPipe,
    TimePipe,
    HoraBr,
    CpfCnpjPipe,
    PadStartPipe,
    PhoneBrPipe,
    TeamsPipe,
    EmailPipe,
    TelefonePipe,
    NumDataType,
    NomeProprio
  ],
  exports: [
    DateBrPipe,
    DateTimeBrPipe,
    AvatarEmpregadoPipe,
    SafePipe,
    FilterPipe,
    DataEspecialPipe,
    UnidadePipe,
    LimitToPipe,
    TimePipe,
    HoraBr,
    CpfCnpjPipe,
    PadStartPipe,
    PhoneBrPipe,
    TeamsPipe,
    EmailPipe,
    TelefonePipe,
    CpfPipe,
    NumDataType,
    NomeProprio
  ],
  declarations: [CpfPipe],
})
export class PipeModule {}
