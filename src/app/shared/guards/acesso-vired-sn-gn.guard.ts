import { Injectable, inject, OnDestroy } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { filter, Observable, Subject, switchMap, map, tap } from 'rxjs';
import { AuthState } from 'src/app/core/store/auth/auth.reducer';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { fromAuth } from 'src/app/core/store/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AcessoViredSnGnGuard implements CanActivate {
  infoGesun = inject(Store<AuthState>);
  router = inject(Router);
  destroy$ = new Subject();
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // return true;
    return this.infoGesun.select(fromAuth.infoGesun).pipe(
      filter((infoGesun) => Boolean(infoGesun.lotacao_original)),
      map((infoGesun) => {
        return   infoGesun.lotacao_original == 5819
              || infoGesun.lotacao_original == 5094
              || infoGesun.lotacao_original == 5247
              || infoGesun.lotacao_original == 5130;
      }));
  }
}
