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
import { AvisosGeraisBetaTesterService } from '../components/avisos-gerais/avisos-gerais-beta-tester.service';

@Injectable({
  providedIn: 'root',
})
export class BetaTesterAcessoGuard implements CanActivate {
  infoGesun = inject(Store<AuthState>);
  router = inject(Router);
  service = inject(AvisosGeraisBetaTesterService)

  destroy$ = new Subject();
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // return true;
    let no_sistema = route.url[0].path;

    return this.service.getAcessoUnidade(no_sistema).pipe(
      map((res) => {
        return  res.pode_acessar;
      })
    )

    // this.infoGesun.select(fromAuth.infoGesun).pipe(
    //   filter((infoGesun) => Boolean(infoGesun.lotacao_original)),
    //   map((infoGesun) => {
    //     return   infoGesun.lotacao_original == 5819
    //           || infoGesun.lotacao_original == 5094
    //           || infoGesun.lotacao_original == 5247
    //           || infoGesun.lotacao_original == 5130;
    //   }));

    //   this.service.getAcessoUnidade().subscribe((res:any)=> true)
  }
}
