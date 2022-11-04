import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../Shared/shared.module";
import { AuthenticationComponent } from "./authentication.component";

@NgModule({
    declarations:[AuthenticationComponent],
    imports:[
        FormsModule,
        RouterModule.forChild([{ path:'',component:AuthenticationComponent}]),
        SharedModule
    ]
})
export class AuthenticationModule{

}