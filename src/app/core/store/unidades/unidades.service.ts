import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Unidade } from '../../models/Unidade';
import lzString from 'lz-string';

@Injectable({
  providedIn: 'root',
})
export class UnidadesService {
  constructor(private httpClient: HttpClient) {}

  // private localStoragekey = '__app_unidades_compressed__';
  private localStoragekey = '__app_unidades__';

  fetch(): Observable<Unidade[]> {
    return this.httpClient.get<Unidade[]>(`${environment.apiUrl}getUnidades`);
  }

  getLocalStorage(): null | Unidade[] {
    try {
      const json = localStorage.getItem(this.localStoragekey);
      if (!json) {
        return null;
      }
      const parsedJson = JSON.parse(JSON.parse(json));
      const now = new Date().getTime();
      return now < parsedJson.ttl ? parsedJson.data : null;
    } catch (error) {
      return null;
    }
  }

  clearOldLocalStorage() {
    if (localStorage.getItem(this.localStoragekey)) {
      localStorage.removeItem(this.localStoragekey);
    }
  }

  setLocalStorage(unidades: Unidade[]) {
    try {
      this.clearOldLocalStorage();
      const ttl = new Date();
      const sixHours = 21600000; // 6 hours un miliseconds
      ttl.setTime(ttl.getTime() + sixHours);
      const object = JSON.stringify({
        data: unidades,
        ttl: ttl.getTime(),
      });

      localStorage.setItem(this.localStoragekey, JSON.stringify(object));
    } catch (error) {
      return;
    }
  }
}
