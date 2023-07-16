import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UploadService } from '../../services/upload.service';

const API_URL = environment.apiUrl;

@Injectable()
export class CompartilharService {
  constructor(private http: HttpClient, private uploadService: UploadService) {}

  uploadFile(
    file: any,
    fileName: string = 'compartilhar.png'
  ): Observable<any> {
    return this.uploadService.upload('face_caixa', file);
  }

  postNewPost(newPost: any): Observable<any[]> {
    return this.http.post<any[]>(
      environment.apiUrl + 'timeline/postagens',
      newPost
    );
  }

  recoveryTestersFaceCaixa(): Observable<any[]> {
    return this.http.get<any[]>(API_URL + 'acessoFaceCaixa');
  }
}
