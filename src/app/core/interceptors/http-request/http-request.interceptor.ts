import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  catchError,
  EMPTY,
  Observable,
  retry,
  Subject,
  switchMap,
  throwError,
} from 'rxjs';
import { AuthService } from '../../store/auth/auth.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  isRefreshing = false;
  refreshTokenSubject = new Subject();

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Check if the request should be skipped
    if (request.url.includes('https://viacep.com.br')) {
      return next.handle(request);
    }

    request = this.addCredentials(request);
    request = this.addAcceptApplicationJson(request);
    request = this.checkMultipart(request);

    const token = this.authService.getSessionStorageToken();
    if (token) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(
      // retry(3),
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  private addCredentials(request: HttpRequest<any>) {
    return request.clone({
      withCredentials: true,
    });
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'cx-auth': token,
      },
    });
  }

  private addAcceptApplicationJson(request: HttpRequest<any>) {
    let headers = request.headers;
    headers.append('Accept', 'application/json');
    return request.clone({ headers });
  }

  private checkMultipart(request: HttpRequest<any>) {
    let headers = request.headers;
    if (headers.get('Content-Type') === 'multipart/form-data') {
      headers = headers.delete('Content-Type');
    } else {
      headers = headers.set('Content-Type', 'application/json');
    }
    return request.clone({
      headers,
    });
  }

  // implementação futura - refresh token

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      return this.authService.fetchAuth().pipe(
        switchMap((auth: any) => {
          this.isRefreshing = false;
          this.authService.setSessionStorageAuth(auth);
          const token = this.authService.getSessionStorageToken() ?? '';
          return next.handle(this.addToken(request, token));
        }),
        catchError((err: any) => {
          this.isRefreshing = false;
          return EMPTY;
        })
      );
    }
    return EMPTY;
  }
}
