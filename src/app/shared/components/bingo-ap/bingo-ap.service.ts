import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BingoAp } from './bingo-ap';

@Injectable({
  providedIn: 'root',
})
export class BingoApService {
  constructor(private httpClient: HttpClient) {}

  getFlagBingo(
    nu_unidade: string | number,
    ano: string | number = 2023
  ): Observable<BingoAp[]> {
    return this.httpClient.get<BingoAp[]>(
      `${environment.apiUrl}face_caixa/get-notas-bingo/${nu_unidade}/${ano}`
    );
  }
}
