import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FuncoesGeraisService } from '../../functions/funcoes-gerais.service';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteMunicipiosService {
  private _url = `${environment.apiUrl}administrativo-free/municipios`;

  constructor(
    private http: HttpClient,
    private funcoesGeraisService: FuncoesGeraisService
  ) {}

  fetchQueryMunicipio(query: string) {
    return this.http
      .get<any[]>(`${this._url}/query/`, {
        params: {
          q: query,
        },
      })
      .pipe(
        map((dados: any[]) =>
          (dados || []).map((row) => ({
            ...row,
            nome_uf: row.vCidade + ', ' + row.vEstado,
          }))
        ),
        catchError((error) => {
          this.funcoesGeraisService.actionsForError(
            'Erro ao consultar CEP',
            'Erro ao consultar este CPF, corriga o número ou tente novamente.'
          );
          console.error(error);
          return throwError(() => new Error(error));
        })
      );
  }
}
