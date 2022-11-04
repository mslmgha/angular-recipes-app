import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadSpinner } from "./load-spinner/load-spinner.componet";
import { PlacehodlerDircetive } from "./Placeholder/placeholder.directive";

@NgModule({
    declarations:[
        LoadSpinner,
        AlertComponent,
        PlacehodlerDircetive,
        DropdownDirective
    ],
    imports:[
        CommonModule
    ],
    exports:[
        LoadSpinner,
        AlertComponent,
        PlacehodlerDircetive,
        DropdownDirective,
        CommonModule
    ]
})
export class SharedModule{

}