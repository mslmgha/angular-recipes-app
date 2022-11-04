import { Component, ContentChild, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { Logout } from '../authentication/store/authentication.action';
import { FetchRecipes, StoreRecipes } from '../recipes/store/recipe.actions';
import { DataStorageService } from '../Shared/data-storage.service';
import { AppState } from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../Shared/shared-style.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userSubcription: Subscription;
  isAuthenticated: boolean = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthenticationService,private store:Store<AppState>) { }
  ngOnDestroy(): void {
    if (this.userSubcription) {
      this.userSubcription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.userSubcription = this.store.select('auth').subscribe(user => {
      this.isAuthenticated = !!user.user;
    }
    );
  }

  saveData() {
    //this.dataStorageService.storeRecipes();
    this.store.dispatch(new StoreRecipes());
  }
  fetchData() {
    this.store.dispatch(new FetchRecipes());
    //this.dataStorageService.getRecipes().subscribe();
  }

  onLogout(){
    this.store.dispatch(new Logout());
    //this.authService.logout();
  }

}
