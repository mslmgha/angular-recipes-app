import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AppState } from "../store/app.reducer";
import { AuthenticationService } from "./authentication.service";

@Injectable({ 'providedIn': 'root' })
export class AuthGaud implements CanActivate {

    constructor(private authService: AuthenticationService, private router: Router,private store:Store<AppState>) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.select('auth').pipe(
            take(1),
            map(user => {
                if (!!user.user) {
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
            })
        )
    }

}