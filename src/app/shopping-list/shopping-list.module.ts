import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../Shared/shared.module";
import { FilterPipe } from "./pipes/filter.pipe";

import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingListEditComponent,
        FilterPipe
    ],
    imports:[
        RouterModule,
        CommonModule,
        FormsModule,
        ShoppingListRoutingModule,
        SharedModule
    ],
})
export class ShoppingListModule{}