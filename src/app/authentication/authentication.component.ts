import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../Shared/alert/alert.component';
import { PlacehodlerDircetive } from '../Shared/Placeholder/placeholder.directive';
import { AppState } from '../store/app.reducer';
import { LoginStart, SignupStart } from './store/authentication.action';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css', '../Shared/shared-style.css']
})
export class AuthenticationComponent implements OnInit, OnDestroy {

  @ViewChild(PlacehodlerDircetive, { static: true }) alertHolder: PlacehodlerDircetive;
  private closeSub: Subscription;
  private storeSub: Subscription;
  isLoginMode = true;
  isLoading = false;
  error = null;

  constructor(private store:Store<AppState>) { }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.storeSub= this.store.select('auth').subscribe(state=>{
      this.isLoading= state.loading;
      this.error= state.errorMessage;
      if(this.error){
        this.showAlert(this.error);
      }
    });
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = null;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const email = form.value.email;
      const password = form.value.password;
      //let authObse: Observable<AuthResponse>
      if (this.isLoginMode) {
        this.store.dispatch(new LoginStart({email: email,password: password}));
        //authObse = this.authService.login(email, password);
      } else {
        this.store.dispatch(new SignupStart({email: email,password: password}));
       // authObse = this.authService.signup(email, password);
      }

      // authObse.subscribe(
      //   authResp => {
      //     this.isLoading = false;
      //     this.error = null;
      //     this.router.navigate(['/recipes']);

      //   }, errorRes => {
      //     this.error = errorRes
      //     this.showAlert(errorRes);
      //     this.isLoading = false;
      //   }
      // );
    } 
    // else {
    //   this.isLoading = false;
    //   return;
    // }
    form.reset();
  }

  onAlertClose() {
    this.error = null;
  }

  private showAlert(message: string) {
    try {
      const alertHolderInstance: ViewContainerRef = this.alertHolder.viewContainerRef;
      alertHolderInstance.clear();
      const alertComponetRef = alertHolderInstance.createComponent(AlertComponent);
      alertComponetRef.instance.message = message;
      this.closeSub = alertComponetRef.instance.close.subscribe(() => {
        this.onAlertClose();
        this.closeSub.unsubscribe();
        alertHolderInstance.clear();
      });
    } catch (error) {
      console.log(error);
    }
  }

}
