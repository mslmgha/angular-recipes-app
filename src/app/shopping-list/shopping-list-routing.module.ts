import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";


const appRouts: Routes=[  
    { path:'',component:ShoppingListComponent},
]
@NgModule({
    imports: [
        RouterModule.forChild(appRouts),
      ],
      exports:[RouterModule],
})
export class ShoppingListRoutingModule{

}