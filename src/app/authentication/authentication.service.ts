import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { environment } from "src/environments/environment";
import { Store } from "@ngrx/store";
import { Auhtenticate, Logout } from "./store/authentication.action";
import { AppState } from "../store/app.reducer";


export interface AuthResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    //user = new BehaviorSubject<User>(null);
    expiretionTime: any;
    constructor(private http: HttpClient, private router: Router, private store: Store<AppState>) {

    }

    signup(email: string, password: string) {
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError), tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
            }));
    }
    login(email: string, password: string) {
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError), tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
            }));
    }

    private handleAuthentication(email: string, id: string, token: string, expiresIn: number) {
        const expiresDate = new Date(new Date().getTime() + +expiresIn * 1000);
        this.store.dispatch(new Auhtenticate({ email, id, token, expiresDate ,redirect: true}));
        const user = new User(email, id, token, expiresDate);
        // this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        this.autoLogout(+expiresIn * 1000)
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
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
        return throwError(errorMessage);
    }

    // logout(){
    //     this.store.dispatch(new Logout());
    //    // this.user.next(null);
    //     this.router.navigate(['/auth']);
    //     localStorage.removeItem('userData');
    //     if(this.expiretionTime){
    //         clearTimeout(this.expiretionTime);
    //     }
    // }

    // autoLogin(){
    //     const userData:{
    //         email:string,
    //         id:string,
    //         _token:string,
    //         _tokenExpirationDate:string
    //     }= JSON.parse(localStorage.getItem('userData'));
    //     if(!userData){
    //         return;
    //     }
    //     const localUser= new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
    //     if(localUser.token){
    //         const timeout=new Date(userData._tokenExpirationDate).getTime()- new Date().getTime();
    //        // this.autoLogout(timeout);
    //         this.store.dispatch(new Auhtenticate({email:localUser.email,id:localUser.id,token:localUser.token,expiresDate:new Date(userData._tokenExpirationDate)}))
    //        // this.user.next(localUser);
    //     }
    // }

    autoLogout(expiresIn: number) {

        this.expiretionTime = setTimeout(() => {
            this.store.dispatch(new Logout());
            // this.logout();
        }, expiresIn)
    }

    clearTimeout() {
        if (this.expiretionTime) {
            clearTimeout(this.expiretionTime);
        }
    }
}