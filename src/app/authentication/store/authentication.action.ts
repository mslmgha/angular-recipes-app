import { Action } from "@ngrx/store";

export const LOGIN_START='[Auth] LOGIN_START';
export const AUTHENTICATE_FAILED='[Auth] AUTHENTICATEFAILED';
export const AUTHENTICATE='[Auth] AUTHENTICATE';
export const AUTO_LOGIN='[Auth] AUTO_LOGIN';
export const SIGNUP_START= '[Auth Signup]'
export const LOGOUT='[Auth] LOGOUT';


export class Auhtenticate implements Action{
    readonly type =AUTHENTICATE;
    constructor(public payload:{
        email:string,
        id:string,
        token:string,
        expiresDate: Date,
        redirect:boolean
    }){}
}

export class Logout implements Action{
    readonly type =LOGOUT;
}

export class LoginStart implements Action{
    readonly type = LOGIN_START;  
    constructor(public payload:{email:string, password:string}){   
    }
}

export class AuhtenticateFialed implements Action{
    readonly type = AUTHENTICATE_FAILED;  
    constructor(public payload:string){   
    }
}

export class SignupStart implements Action{
    readonly type= SIGNUP_START
    constructor(public payload:{email:string, password:string}){}
}

export class AutoLogin implements Action{
    readonly type =AUTO_LOGIN;
}
export type AuthenticationActionsType= Auhtenticate| Logout| LoginStart | AuhtenticateFialed | SignupStart | AutoLogin;