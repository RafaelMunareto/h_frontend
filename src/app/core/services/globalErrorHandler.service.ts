import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import StackTrace from 'stacktrace-js';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private httpClient: HttpClient) {}
  handleError(error: any) {
    if (!environment.production) throw error;
    if (error instanceof HttpErrorResponse) {
      return;
    }
    StackTrace.fromError(error).then((stackframes) => {
      const stringifiedStack = stackframes
        .map(function (sf) {
          return sf.toString();
        })
        .join('\n');
      const url = `${environment.apiUrl}log/erros/frontend`;
      const data = {
        url: window.location.href,
        code: 0,
        message: error.message,
        stack: stringifiedStack,
      };

      this.httpClient.post(url, data).subscribe(() => {
        throw error;
      });
    });
  }
}
