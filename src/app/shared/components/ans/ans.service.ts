import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UploadService } from '../../services/upload.service';

const API_URL = environment.apiUrl;

@Injectable()
export class AnsService {
  constructor(private http: HttpClient, private uploadService: UploadService) { }

  checkANS(): Observable<any> {
    return this.http
      .get<any>(
        environment.apiUrl + 'ans/assinatura'
      )      
    };  

  postANS(obj: any): Observable<any> {
    return this.http
      .post<any>(
        environment.apiUrl + 'ans/assinatura', obj
      )
    };

}
