import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  Item,
  Grupo,
  Exibicao,
  Decoracao,
} from '../../../core/store/menu/menu.reducer';

@Injectable({
  providedIn: 'root',
})
export class FaceMenuEditorService {
  private apiUrl = `${environment.apiUrl}ferramentas/`;

  constructor(private httpClient: HttpClient) {}

  public getItens() {
    return this.httpClient.get<Item[]>(`${this.apiUrl}itens`);
  }

  public getGrupos() {
    return this.httpClient
      .get<Grupo[]>(`${this.apiUrl}categorias?itens=1`)
      .pipe(map((lista) => lista.filter((grupo) => grupo.exibicao_id >= 4)));
  }

  public getExibicoes() {
    return this.httpClient
      .get<Exibicao[]>(`${this.apiUrl}exibicoes`)
      .pipe(map((lista) => lista.filter((exibicao) => exibicao.id >= 4)));
  }

  public getDecoracoes() {
    return this.httpClient.get<Decoracao[]>(`${this.apiUrl}decoracoes`);
  }

  public postGrupo(grupo: Grupo): Observable<Grupo> {
    return this.httpClient.post<Grupo>(`${this.apiUrl}categorias`, {
      ...grupo,
    });
  }

  public deleteGrupo(id: number): Observable<boolean> {
    return this.httpClient
      .delete(`${this.apiUrl}categorias/${id}`)
      .pipe(map(() => true));
  }
}
