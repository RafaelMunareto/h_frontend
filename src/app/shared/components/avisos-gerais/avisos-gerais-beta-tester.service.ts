import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AvisosGeraisBetaTesterService {
  constructor(private httpClient: HttpClient) {}

  getAvisosGerais(
    id:number
  ): Observable<any[]> {
    return this.httpClient.get<any[]>(
      `${environment.apiUrl}acessos/avisos-gerais/${id}`
    );
  }

  getAcessoUnidade(no_sistema:string){
    return this.httpClient.get<any>(
      `${environment.apiUrl}acessos/beta-tester/pode-acessar`,{params:{no_sistema}}
    );
  }

}
