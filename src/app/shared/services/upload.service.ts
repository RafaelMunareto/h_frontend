import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Arquivo } from '../model/administrativo/arquivo';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private apiUrl = `${environment.apiUrl}upload`;
  constructor(private httpClient: HttpClient) {}

  upload(
    sistema: string,
    arquivo: File,
    subsistema: string | null = null,
    descricao: string | null = null,
    admin = false,
    ativo = null,
    id: number | null = null,
    nome_exibicao: string | null = null
  ): Observable<Arquivo> {
    if (!sistema || !arquivo) {
      throw new Error('');
    }
    const form = new FormData();
    form.append('sistema', sistema);
    if (nome_exibicao) {
      form.append('nome_exibicao', nome_exibicao);
    }
    if (descricao) {
      form.append('descricao', descricao);
    }
    if (admin) {
      form.append('administrativo', 'true');
    }
    if (ativo !== null) {
      form.append('ativo', String(ativo));
    }
    if (subsistema) {
      form.append('subsistema', subsistema);
    }
    form.append('arquivo', arquivo);
    if (!id) {
      return this.httpClient.post<Arquivo>(this.apiUrl, form, {
        headers: new HttpHeaders({
          'Content-Type': 'multipart/form-data',
        }),
      });
    }
    return this.httpClient.post<Arquivo>(`${this.apiUrl}/${id}`, form, {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
      }),
    });
  }

  deleteById(id: number): Observable<Arquivo> {
    return this.httpClient.delete<Arquivo>(`${this.apiUrl}/${id}`);
  }

  getUrl(id: number): string {
    return `${this.apiUrl}/${id}`;
  }

  getList(params: {
    sistema?: string;
    subsistema?: string;
    admin?: boolean;
    ativo?: boolean;
  }): Observable<Arquivo[]> {
    const { sistema, subsistema, admin, ativo } = params;
    const url = [this.apiUrl];
    if (admin) {
      url.push('administrativo');
    }
    url.push('lista');
    if (sistema) {
      url.push(sistema);
    }
    if (subsistema) {
      url.push(subsistema);
    }
    const query: { [key: string]: any } = { params: {} };
    if (ativo === true || ativo === false) {
      query['params'].ativo = ativo;
    }
    return this.httpClient.get<Arquivo[]>(url.join('/'), query);
  }

  patch(params: Arquivo): Observable<Arquivo> {
    return this.httpClient.patch<Arquivo>(
      `${this.apiUrl}/${params.id}`,
      params
    );
  }

  getRawFile(id: number): Observable<Blob> {
    return this.httpClient.get(`${this.apiUrl}/arquivo/${id}`, {
      responseType: 'blob',
    });
  }

  // deleteByName(sistema: string, arquivo: string): Observable<Arquivo> {
  //   return this.httpClient.delete(`${this.apiUrl}/${sistema}/${arquivo}`);
  // }
}
