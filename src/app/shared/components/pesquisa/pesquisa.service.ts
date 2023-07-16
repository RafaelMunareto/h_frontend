import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";

const API_URL = environment.apiUrl;

@Injectable()
export class PesquisasService {

    constructor( private http:HttpClient ) {}

    getSurvey(name:string):Observable<any>{
        return this.http.get<any>(API_URL + 'pesquisas/get-pesquisa/'+name);
    }

    getAnswers(surveyName:string):Observable<any>{
        return this.http.get<any>(API_URL + 'pesquisas/get-respostas/'+surveyName);
    }

    postAnswer(ans: any): Observable<any>{
        return this.http.post<any>(API_URL + 'pesquisas/post-resposta', ans);
    }

}