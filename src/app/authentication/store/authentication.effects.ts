import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthenticationService } from "../authentication.service";
import { AUTHENTICATE, Auhtenticate, AuhtenticateFialed, LoginStart, LOGIN_START, SIGNUP_START, SignupStart, LOGOUT, AUTO_LOGIN } from "./authentication.action";
import { User } from "../user.model";


export interface AuthResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthenticationEffects {
    @Effect()
    authLogin = this.action$.pipe(
        ofType(LOGIN_START), switchMap((authData: LoginStart) => {
            return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }).pipe(map((authResponse: AuthResponse) => {
                    return this.authenticateHandle(authResponse.email, authResponse.localId, authResponse.idToken, +authResponse.expiresIn);
                }), catchError((error) => {
                    const erorMessage = this.handleError(error)
                    return of(new AuhtenticateFialed(erorMessage));
                }))
        })
    )
    @Effect({ dispatch: false })
    loginSuccess = this.action$.pipe(
        ofType(AUTHENTICATE), tap((auth:Auhtenticate) => {
            if(auth.payload.redirect){
                this.router.navigate(['/']);
            }
        })
    )
    @Effect({ dispatch: false })
    logout = this.action$.pipe(
        ofType(LOGOUT), tap(() => {
            localStorage.removeItem('userData');
            this.authService.clearTimeout();
            this.router.navigate(['/auth']);
        })
    )

    @Effect()
    signup = this.action$.pipe(
        ofType(SIGNUP_START), switchMap((authData: SignupStart) => {
            return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }).pipe(map((authResponse: AuthResponse) => {
                    return this.authenticateHandle(authResponse.email, authResponse.localId, authResponse.idToken, +authResponse.expiresIn);
                }), catchError((error) => {
                    const eerorMessage = this.handleError(error)
                    return of(new AuhtenticateFialed(eerorMessage));
                }))
        })
    )

    @Effect()
    autoLogin = this.action$.pipe(
        ofType(AUTO_LOGIN), map(() => {
            const userData: {
                email: string,
                id: string,
                _token: string,
                _tokenExpirationDate: string
            } = JSON.parse(localStorage.getItem('userData'));
            if (userData) {
                const localUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
                if (localUser.token) {
                    const expirationDuration =
                        new Date(userData._tokenExpirationDate).getTime() -
                        new Date().getTime();
                    this.authService.autoLogout(expirationDuration);
                    return new Auhtenticate({
                        email: localUser.email,
                        id: localUser.id,
                        token: localUser.token,
                        expiresDate: new Date(userData._tokenExpirationDate),
                        redirect:false,
                    });
                } else {
                    return { type: 'null' };
                }
            } else {
                return { type: 'null' };
            }

        })
    )

    constructor(private action$: Actions, private http: HttpClient, private router: Router, private authService: AuthenticationService) {
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct.';
                break;
        }
        return errorMessage;
    }

    private authenticateHandle(email: string, userID: string, token: string, expiresIn: number) {
        const expiresDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(email, userID, token, expiresDate);
        localStorage.setItem('userData', JSON.stringify(user));
        this.authService.autoLogout(+expiresIn * 1000);
        return new Auhtenticate(
            {
                email: email,
                id: userID,
                token: token,
                expiresDate: expiresDate,
                redirect:true,
            }
        );
    }

}
