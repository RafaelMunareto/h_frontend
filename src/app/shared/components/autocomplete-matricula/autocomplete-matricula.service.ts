import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Funcionario } from 'src/app/core/models/Funcionario';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteMatriculaService {
  constructor(private httpClient: HttpClient) {}

  getMatricula(matricula: string): Observable<Funcionario> {
    return this.httpClient
      .get<Funcionario>(
        `${environment.apiUrl}administrativo-free/funcionarios/${matricula}`
      )
      .pipe(
        map((data) => ({
          ...data,
          matriculaNome: `${data.matricula} - ${data.nome}`,
        }))
      );
  }

  getSugestoes(
    pesquisa: string,
    unidade?: string | number
  ): Observable<Funcionario[]> {
    return this.httpClient
      .get<Funcionario[]>(
        `${environment.apiUrl}administrativo-free/funcionarios/find`,
        {
          params: {
            q: pesquisa,
            ...(unidade ? { unidade: String(unidade) } : {}),
          },
        }
      )
      .pipe(
        map((data) =>
          data.map((d) => ({
            ...d,
            matriculaNome: `${d.matricula} - ${d.nome}`,
          }))
        )
      );
  }
}
