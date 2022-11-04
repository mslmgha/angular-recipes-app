import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { exhaustMap, map, take } from "rxjs/operators";
import { AppState } from "../store/app.reducer";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthenticationService,private store:Store<AppState>) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth').pipe(take(1),map(state=> {return state.user}), exhaustMap(user => {
            if (user && user.token) {
                const authenticatedRequest = req.clone({
                    params: new HttpParams().set('auth', user.token)
                });
                return next.handle(authenticatedRequest);
            }
            return next.handle(req);
        }));
    }

}