import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { AutoLogin } from './authentication/store/authentication.action';
import { AppState } from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[]
})
export class AppComponent implements OnInit{
  constructor( private store:Store<AppState>,@Inject(PLATFORM_ID) private platformID){
  }
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformID)){
      this.store.dispatch(new AutoLogin());
    }
   // this.authService.autoLogin();
  }
  title = 'shopping-app';
 
}
