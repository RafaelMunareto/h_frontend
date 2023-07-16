import { Funcionario } from './Funcionario';
import { Unidade } from './Unidade';

export interface InfoGesun {
  matricula: string;
  matricula_original: string;
  nu_matricula: number;
  nu_dv_matricula: number;
  nome: string;
  dt_nascimento: string;
  dt_admissao: string;
  co_funcao: number;
  no_funcao: string;
  lotacao: number;
  info_lotacao?: Unidade;
  lotacao_original: number;
  info_lotacao_original?: Unidade;
  ic_substituindo: boolean;
  ic_gestor_unidade: boolean;
  ic_gesun: boolean;
}
