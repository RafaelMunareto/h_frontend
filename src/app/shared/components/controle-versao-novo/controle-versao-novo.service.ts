import { catchError, tap } from 'rxjs/operators';

import { map, Observable, EMPTY, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ControleVersao } from 'src/app/shared/model/administrativo/ControleVersao';

@Injectable({
  providedIn: `root`,
})
export class ControleVersaoNovoService {
  listaBuildado: ControleVersao[] = [];

  constructor(private httpClient: HttpClient) {}

  getListaComBuild(
    rede = 'varejo',
    sistema = ''
  ): Observable<ControleVersao[]> {
    return this.httpClient
      .get<ControleVersao[]>(
        `${environment.apiUrl}administrativo/getVersaoBuildado`,
        {
          params: { rede, sistema },
        }
      )
      .pipe(
        map((lista) =>
          lista.map((item) => ({
            ...item,
            tag_versao: !item.nr_versao
              ? 'Nova'
              : `${item.nr_versao}.${item.nr_implementacao}.${item.nr_bug}`,
          }))
        ),
        tap((lista) => {
          this.listaBuildado = lista;
        })
      );
  }

  getListaComBuildFiltrada(sistema = ''): Observable<ControleVersao[]> {
    return of(
      sistema == 'RedeVarejo'
        ? this.listaBuildado
        : this.listaBuildado.filter((item) => item.sistema == sistema)
    );
  }

  getDropdownBuildado(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      `${environment.apiUrl}administrativo/getDropdownBuildado`
    );
  }

  getLista(sistema = ''): Observable<ControleVersao[]> {
    return this.httpClient
      .get<ControleVersao[]>(`${environment.apiUrl}administrativo/getVersao`, {
        params: { sistema },
      })
      .pipe(
        map((lista) =>
          lista.map((item) => ({
            ...item,
            tag_versao: !item.nr_versao
              ? 'Nova'
              : `${item.nr_versao}.${item.nr_implementacao}.${item.nr_bug}`,
          }))
        )
      );
  }

  deleteItem(id: number): Observable<ControleVersao> {
    const url = `${environment.apiUrl}administrativo/deleteVersao/${id}`;
    return this.httpClient.delete<ControleVersao>(url);
  }

  post(
    descricao: string,
    tipo: number,
    sistema: string = ''
  ): Observable<ControleVersao> {
    if (tipo == 1)
      return this.httpClient.post<ControleVersao>(
        `${environment.apiUrl}administrativo/postBuild`,
        { descricao }
      );
    else
      return this.httpClient.post<ControleVersao>(
        `${environment.apiUrl}administrativo/postVersao`,
        { descricao, tipo, sistema }
      );
  }
}
