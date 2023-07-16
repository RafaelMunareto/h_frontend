import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class ModalVideoService {
  constructor(private http: HttpClient) {}

  verifica(sis:any): Observable<any[]> {
    return this.http.get<any[]>(API_URL + 'tutoriais/verificar/' + sis);
  }

  unsubscribe(sis:any): Observable<any> {
    return this.http.post<any[]>(API_URL + 'tutoriais/unsubscribe', {sistema:sis});
  }
}
