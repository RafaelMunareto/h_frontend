import { unidadesActions } from './../../store/unidades/unidades.actions';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';

import { UnidadesState } from '../../store/unidades/unidades.reducer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private unidadesStore: Store<UnidadesState>) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // this.authStore.dispatch(authActions.fetch());
    return true;

    // this.authStore.select(fromAuth.sucesso).pipe(
    //   filter((success: any) => success),
    //   take(1),
    //   tap(() => this.unidadesStore.dispatch(unidadesActions.fetch()))
    // );
  }
}
