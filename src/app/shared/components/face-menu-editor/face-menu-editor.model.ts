import { Grupo, Item, Decoracao, Exibicao  } from '../../../core/store/menu/menu.reducer'

interface FormGroupForm {
  exibicao_id: number;
  decoracao_id?: number;
  nome: string;
  descricao?: string;
  ordem: number;
  validade_inicio: string;
  validade_fim?: string;
  matricula: string;
  fixo: boolean;
  acesso_restrito: boolean;
  icone?: string;
}

export { Grupo, Item, Decoracao, Exibicao, FormGroupForm };
