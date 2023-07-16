export type Status =
  | 'INICIALIZADO'
  | 'CARREGANDO'
  | 'SUCESSO'
  | 'ERRO'
  | 'SALVANDO';

export enum StatusEnum {
  INICIALIZADO = 'INICIALIZADO',
  CARREGANDO = 'CARREGANDO',
  SUCESSO = 'SUCESSO',
  ERRO = 'ERRO',
  SALVANDO = 'SALVANDO',
}
