import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Noticia } from './overlay-news.models';

@Injectable({
  providedIn: 'root'
})
export class OverlayNewsService {

  public apiUrl = environment.apiUrl + 'noticias';

  constructor(private http: HttpClient) { }

  getNoticias(sistema: string, subsistema?: string): Observable<Noticia[]> {
    let url = `${this.apiUrl}/${sistema}`;

    if (subsistema) 
      url += `/${subsistema}`;

    return this.http.get<Noticia[]>(url);
  }

}
